#include "caff.h"

#include <bits/stdint-uintn.h>
#include <fstream>
#include <iterator>
#include <vector>
#include <iostream>

#include "ciff_to_ppm.h"
#include "ciff.h"

caff::caff(const std::string &filename)
{
	std::ifstream ifs(filename, std::ios::binary | std::ios::in);

	ifs.unsetf(std::ios::skipws);

	if (!ifs.is_open()) {
		throw ifs.get();
	}

	std::vector<uint8_t> data((std::istreambuf_iterator<char>(ifs)),
				  std::istreambuf_iterator<char>());
	parse_data(data);
}

caff::caff(std::vector<uint8_t>& data)
{
	parse_data(data);
}

const std::vector<uint64_t>& caff::get_durations() const
{
	return this->durations;
}

const std::vector<ciff>& caff::get_ciff_images() const 
{
	return this->ciff_images;
}

caff_credits caff::get_caff_credits(void) const 
{
	return this->credits;
}

caff_head caff::get_caff_header(void) const 
{
	return this->caff_header;
}


void caff::parse_data(std::vector<uint8_t> &data)
{
	if (data.size() == 0) {
		throw "Data is empty";
	}
	if (data[0] != HEADER) {
		throw "First byte of caff file must be 0x01";
	}

	uint8_t block_id = 0;
	uint64_t leng = 0;

	size_t i = 0;

	parse_state p = id;
	std::vector<uint8_t>::iterator it = data.begin();
	while (it != data.end()) {
		switch (p) {
		case id: {
			block_id = *it;
			p = length;
			it++;

			break;
		}
		case length: {
			leng += (*it) << (i * 8);
			i++;

			if (i == 8) {
				if (block_id == HEADER)
					parse_header(it + 1, it + leng + 1);
				else if (block_id == CREDITS)
					parse_credits(it + 1, it + leng + 1);
				else {
					parse_ciff(it + 1, it + leng + 1);
				}

				i = 0;
				if ((it + leng) > data.end())
					return;
				else
					it += leng + 1;

				leng = 0;

				p = id;
			} else {
				it++;
			}
			break;
		}
		}
	}
}

void caff::parse_header(std::vector<uint8_t>::iterator beg,
			std::vector<uint8_t>::iterator end)
{
	char magic_string[5];
	magic_string[4] = '\0';

	size_t i = 0;


	parse_header_state ph = magic;

	for (std::vector<uint8_t>::iterator it = beg; it != end; it++) {
		switch (ph) {
		case magic: {
			magic_string[i] = *it;
			i++;
			if (i == 4) {
				i = 0;
				if (std::string{ magic_string } == CAFF_MAGIC) {
					ph = header_size;
				} else {
					throw "Magic mismatch";
				}
			}
			break;
		}
		case header_size: {
			this->caff_header.header_size += (*it) << (i * 8);
			i++;
			if (i == 8) {
				ph = num_anim;
				i = 0;
			}
			break;
		}
		case num_anim: {
			this->caff_header.num_anim += (*it) << (i * 8);
			i++;
			if (i == 8) {
				ph = done;
				i = 0;
			}
			break;
		}
		case done: {
			return;
		}
		}
	}

	if (ph != done) {
		throw "Parse header failed in caff class";
	}
}

void caff::parse_credits(std::vector<uint8_t>::iterator beg,
			 std::vector<uint8_t>::iterator end)
{
	parse_credits_state pc = year;
	size_t i = 0;

	for (std::vector<uint8_t>::iterator it = beg; it != end; it++) {
		switch (pc) {
		case year: {
			this->credits.year += (*it) << (i * 8);
			i++;
			if (i == 2) {
				pc = month;
				i = 0;
			}
			break;
		}
		case month: {
			this->credits.month = *it;
			pc = day;
			break;
		}
		case day: {
			this->credits.day = *it;
			pc = hour;
			break;
		}
		case hour: {
			this->credits.hour = *it;
			pc = minute;
			break;
		}
		case minute: {
			this->credits.minute = *it;
			pc = creator_len;
			break;
		}
		case creator_len: {
			this->credits.creator_len += (*it) << (i * 8);
			i++;
			if (i == 8) {
				pc = creator;
				i = 0;
			}
			break;
		}
		case creator: {
			this->credits.creator += (char)(*it);
			i++;
			if (i == this->credits.creator_len) {
				pc = done_s;
				i = 0;
			}
			break;
		}
		case done_s: {
			return;
		}
		}
	}

	if (pc != done_s) {
		throw "Parse credits failed in caff class";
	}
}

void caff::parse_ciff(std::vector<uint8_t>::iterator beg,
		      std::vector<uint8_t>::iterator end)
{
	parse_ciff_state c = duration;
	uint64_t dur = 0;
	size_t i = 0;
	for (std::vector<uint8_t>::iterator it = beg; it != end; it++) {
		switch (c) {
		case duration: {
			dur += (*it) << (i * 8);
			i++;
			if (i == 8) {
				c = ciff_blocks;
				this->durations.push_back(dur);
			}
			break;
		}
		case ciff_blocks: {
			std::vector<uint8_t> ciff_data{ it, end };
			ciff ciff{ std::move(ciff_data) };
			this->ciff_images.push_back(ciff);
			c = done_ciff;
			break;
		}
		case done_ciff: {
			return;
		}
		}
	}
	if (c != done_ciff) {
		throw "Problem while parsing ciff image data";
	}
}
