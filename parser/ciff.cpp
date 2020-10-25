#include "ciff.h"

#include <bits/stdint-uintn.h>
#include <fstream>
#include <iostream>
#include <iterator>
#include <string>
#include <memory>

#include "exceptions.h"

ciff::ciff(const std::string filename)
{
	std::ifstream ifs("test.ciff", std::ios::binary | std::ios::in);

	ifs.unsetf(std::ios::skipws);

	if (!ifs.is_open()) {
		// TODO throw exception
	}
	//std::istream_iterator<uint8_t> start(ifs), end;
	std::vector<uint8_t> data((std::istreambuf_iterator<char>(ifs)),
				  std::istreambuf_iterator<char>());
	uint64_t parsed = parse_header(data);

	std::vector<uint8_t>::const_iterator first = data.begin() + parsed;
	std::vector<uint8_t>::const_iterator last = data.end();
	this->data = std::make_shared<std::vector<uint8_t> >(first, last);
}

ciff::ciff(std::vector<uint8_t> &&data)
{
	uint64_t parsed = parse_header(data);

	std::vector<uint8_t>::const_iterator first = data.begin() + parsed;
	std::vector<uint8_t>::const_iterator last = data.end();
	this->data = std::make_shared<std::vector<uint8_t> >(first, last);
}

uint64_t ciff::parse_header(const std::vector<uint8_t> &data)
{
	char magic_string[5];
	magic_string[4] = '\0';

	size_t switch_var = 0;

	size_t tag_len = 0;

	size_t current_header_length = 0;

	for (auto s : data) {
		switch (p) {
		case magic: {
			current_header_length++;
			magic_string[switch_var] = s;
			switch_var++;
			if (switch_var == 4) {
				p = header_s;
				switch_var = 0;
				if (std::string{ magic_string } != CIFF_MAGIC)
					throw magic_exception(magic_string);
			}
			break;
		}
		case header_s: {
			current_header_length++;
			this->header.header_size += s << (switch_var * 8);
			switch_var++;
			if (switch_var == 8) {
				p = content_s;
				switch_var = 0;
			}
			break;
		}
		case content_s: {
			current_header_length++;
			this->header.content_size += s << (switch_var * 8);
			switch_var++;
			if (switch_var == 8) {
				p = w;
				switch_var = 0;
			}
			break;
		}
		case w: {
			current_header_length++;
			this->header.width += s << (switch_var * 8);
			switch_var++;
			if (switch_var == 8) {
				p = h;
				switch_var = 0;
			}
			break;
		}
		case h: {
			current_header_length++;
			this->header.height += s << (switch_var * 8);
			switch_var++;
			if (switch_var == 8) {
				p = capt;
				switch_var = 0;
			}
			break;
		}
		case capt: {
			current_header_length++;
			if (s == '\n') {
				p = tag;
			}
			this->header.caption += s;
			break;
		}
		case tag: {
			if (this->header.header_size ==
				    current_header_length + 1 &&
			    s == '\0')
				p = done;
			if (current_header_length == this->header.header_size &&
			    s != '\0') {
				//TODO: throw exception because parsing failed
			}
			if (s != '\0') {
				if (this->header.tags.size() ==
				    tag_len) // TODO check default vector length, should be 0
				{
					this->header.tags.push_back(
						std::string{ (char)s });
				} else {
					this->header
						.tags[header.tags.size() - 1] +=
						(char)s;
				}
			} else {
				tag_len++;
			}
			current_header_length++;
			break;
		}
		case done: {
			return current_header_length;
		}
		}
	}

	if (p != done) {
		throw "sajnos nem sikerult"; // TODO throw exception
	}
	return current_header_length; // should never reach this point
}
