#ifndef __caff_h_
#define __caff_h_

#include "ciff.h"
#include <bits/stdint-uintn.h>

#define HEADER 0x01
#define CREDITS 0x02
#define ANIMATION 0x03
#define CAFF_MAGIC "CAFF"

struct caff_head {
	uint64_t header_size = 0;
	uint64_t num_anim = 0;
};

struct caff_credits {
	uint16_t year = 0;
	uint8_t month = 0;
	uint8_t day = 0;
	uint8_t hour = 0;
	uint8_t minute = 0;
	uint64_t creator_len = 0;
	std::string creator;
};

class caff {
    public:
	//! Constructor for caff from file
	caff(const std::string &filename);
	//! Constructor for caff from data
	caff(std::vector<uint8_t> &data);

	//Default move and copy constructors should be okay

	//! Getter for durations
	const std::vector<uint64_t> &get_durations(void) const;

	//! Getter for ciff images
	const std::vector<ciff> &get_ciff_images(void) const;

	//! Getter for caff credits
	caff_credits get_caff_credits(void) const;

	//! Getter for caff header
	caff_head get_caff_header(void) const;

    private:
	enum parse_state { id, length };
	enum parse_header_state { magic, header_size, num_anim, done };
	enum parse_credits_state {
		year,
		month,
		day,
		hour,
		minute,
		creator_len,
		creator,
		done_s
	};

	enum parse_ciff_state { duration, ciff_blocks, done_ciff };

	caff_head caff_header;
	caff_credits credits;
	std::vector<uint64_t> durations;
	std::vector<ciff> ciff_images;

	void parse_data(std::vector<uint8_t> &data);
	void parse_header(std::vector<uint8_t>::iterator beg,
			  std::vector<uint8_t>::iterator end);
	void parse_credits(std::vector<uint8_t>::iterator beg,
			   std::vector<uint8_t>::iterator end);
	void parse_ciff(std::vector<uint8_t>::iterator beg,
			std::vector<uint8_t>::iterator end);
};

#endif
