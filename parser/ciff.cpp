#include "ciff.h"

//#include <bits/stdint-uintn.h>
#include <fstream>
#include <iostream>
#include <iterator>
#include <string>
#include <memory>

#include "exceptions.h"

ciff::ciff(const std::string filename)
{
	std::ifstream ifs(filename, std::ios::binary | std::ios::in);

	ifs.unsetf(std::ios::skipws);

	if (!ifs.is_open()) {
		throw ifs.get(); // Should work, code reviewer pls check
	}
	//std::istream_iterator<uint8_t> start(ifs), end;
	std::vector<uint8_t> data((std::istreambuf_iterator<char>(ifs)),
				  std::istreambuf_iterator<char>());
	uint64_t parsed = parse_header(data);

	std::vector<uint8_t>::const_iterator first = data.begin() + parsed;
	std::vector<uint8_t>::const_iterator last = data.end();

	this->data = std::make_shared<std::vector<uint8_t> >(first, last);

	if (this->data->size() != this->header.content_size) {
		throw "Content Size error";
	}
}

ciff::ciff(std::vector<uint8_t> &data)
{
	uint64_t parsed = parse_header(data);

	std::vector<uint8_t>::const_iterator first = data.begin() + parsed;
	std::vector<uint8_t>::const_iterator last = data.end();
	this->data = std::make_shared<std::vector<uint8_t> >(first, last);
}

ciff::ciff(const ciff &c)
{
	this->header.header_size = c.header.header_size;
	this->header.content_size = c.header.content_size;
	this->header.caption = c.header.caption;
	this->header.height = c.header.height;
	this->header.width = c.header.width;
	this->header.tags = c.header.tags;

	this->data = std::make_shared<std::vector<uint8_t> >(*c.data.get());
}

ciff::ciff(ciff &&c)
{
	this->header.header_size = c.header.header_size;
	this->header.content_size = c.header.content_size;
	this->header.caption = c.header.caption;
	this->header.height = c.header.height;
	this->header.width = c.header.width;
	this->header.tags = c.header.tags;

	this->data = c.data;
	c.data = nullptr;
}

ciff &ciff::operator=(const ciff &c)
{
	if (&c == this) {
		return *this;
	}

	this->header = c.header;
	this->data = c.data;
	return *this;
}

ciff &ciff::operator=(ciff &&c)
{
	this->data = c.data;
	c.data = nullptr;
	this->header = c.header;
	return *this;
}

uint64_t ciff::get_header_size(void) const
{
	return this->header.header_size;
}

uint64_t ciff::get_content_size(void) const
{
	return this->header.content_size;
}

uint64_t ciff::get_width(void) const
{
	return this->header.width;
}

uint64_t ciff::get_height(void) const
{
	return this->header.height;
}

std::string ciff::get_caption() const
{
	return this->header.caption;
}

std::vector<std::string> ciff::get_tags() const
{
	return this->header.tags;
}

std::shared_ptr<std::vector<uint8_t> > ciff::get_data(void)
{
	return this->data;
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
				throw parse_failed{
					"Parse failed because header length isnt correct"
				};
			}
			if (s != '\0') {
				if (this->header.tags.size() == tag_len) {
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
		throw parse_failed{
			"Parse is not at end state, but there is no more data to parse"
		};
	}
	return current_header_length; // should never reach this point
}
