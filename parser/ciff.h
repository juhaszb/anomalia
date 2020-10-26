#ifndef __ciff_h_
#define __ciff_h_

#include <array>
#include <bits/stdint-uintn.h>
#include <exception>
#include <memory>
#include <string>
#include <vector>

#define CIFF_MAGIC "CIFF"

class ciff {
    public:
	//! Construct a ciff object from a file
	/*!
   \param filename From where to construct a ciff object
  */
	ciff(const std::string filename);

	//! Construct a ciff object from data
	/*!
    \param data From where to construct a ciff object
   */
	ciff(std::vector<uint8_t> &&data);

	//! Copy constructor
	ciff(const ciff &c);

	//! Move constructor
	ciff(ciff &&c);

	//! Destructor
	~ciff() = default;

	uint64_t get_header_size(void) const;
	uint64_t get_content_size(void) const;
	uint64_t get_width(void) const;
	uint64_t get_height(void) const;
	std::string get_caption(void) const;
	std::vector<std::string> get_tags(void) const;
	std::shared_ptr<std::vector<uint8_t>> get_data(void);


    private:
	struct ciff_header {
		uint64_t header_size = 0; /*!Header size, 8 byte long field.*/
		uint64_t content_size =
			0; /*! Content size, 8 byte long field.*/
		uint64_t width =
			0; /*!Width of the image, 8 byte long, can be zero.  */
		uint64_t height =
			0; /*! Height of the image, 8 byte long, can be zero. */
		std::string
			caption; /*! Caption of the image, cannot contain \n */
		std::vector<std::string> tags; /*! Image tags */
	};

	ciff_header header;
	std::shared_ptr<std::vector<uint8_t> > data; /*! Pixel data */

	enum parse_state {
		magic,
		header_s,
		content_s,
		w,
		h,
		capt,
		tag,
		done,
	}; /*! Enum for parsing, internal use only */

	parse_state p = magic;

	uint64_t parse_header(const std::vector<uint8_t> &data);
};

#endif
