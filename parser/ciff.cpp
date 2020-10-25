#include "ciff.h"

#include <string>
#include <iostream>
#include <fstream>
#include <iterator>

#include "exceptions.h"

ciff::ciff(const std::string filename)
{
	std::ifstream ifs{filename, std::ios::binary | std::ios::in | std::ios::ate};
	
	if(!ifs.is_open())
	{
		//TODO throw exception
	}
	std::istream_iterator<uint8_t> start(ifs), end;	
	std::vector<uint8_t> data(start, end);
	parse_from_data(data);
}


void ciff::parse_from_data(const std::vector<uint8_t>& data)
{
	char magic_string[5];
	magic_string[4] = '\0';
	
	size_t switch_var = 0;

	size_t magic_length = 0;
	size_t header_length = 0;
	size_t content_length = 0;
	size_t width_length = 0;
	size_t height_length = 0;
	size_t caption_length = 0;
	size_t tag_length = 0;

	for(auto s: data)
	{
		switch(p)
		{
			case magic:
			{
				magic_string[4-switch_var] = s;
				switch_var++;
				if(switch_var == 4)
				{
					p = header_s;
					switch_var = 0;
					if(std::string{magic_string} != CIFF_MAGIC)
						throw magic_exception(magic_string);
				}
				break;
			}
			case header_s:
			{
				this->header.header_size += s<<((8-switch_var));
				switch_var++;
				if(switch_var == 8)
				{
					p = content_s;
					switch_var = 0;
				}
				break;
			}
			case content_s:
			{
				this->header.content_size += s<<((8-switch_var));
				switch_var++;
				if(switch_var == 8)
				{
					p = w;
					switch_var = 0;
				}
				break;
			}
			case w:
			{
				this->header.width += s<<(8-switch_var);
				switch_var++;
				if(switch_var == 8)
				{
					p = h;
					switch_var = 0;
				}
			}

			
		}
	}
	
	if(p!=done)
	{
		//TODO throw exception
	}

}
