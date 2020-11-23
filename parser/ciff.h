#ifndef __ciff_h_
#define __ciff_h_

#include <array>
//#include <bits/stdint-uintn.h>
#include <exception>
#include <memory>
#include <string>
#include <vector>

#define CIFF_MAGIC "CIFF"

//! Ciff header
struct ciff_header {
	/*!Header size, 8 byte long field.*/
	uint64_t header_size = 0;
	/*! Content size, 8 byte long field.*/
	uint64_t content_size = 0;
	/*!Width of the image, 8 byte long, can be zero.  */
	uint64_t width = 0;
	/*! Height of the image, 8 byte long, can be zero. */
	uint64_t height = 0;
	/*! Caption of the image, cannot contain \n */
	std::string caption;
	/*! Image tags */
	std::vector<std::string> tags;
};

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
	ciff(std::vector<uint8_t> &data);

	//! Copy constructor
	ciff(const ciff &c);

	//! Move constructor
	ciff(ciff &&c);

	//! Copy assignment
	ciff &operator=(const ciff &c);

	//! Move assignment
	ciff &operator=(ciff&& c);

	//! Destructor
	~ciff() = default;

	//!Getter for header_size
	uint64_t get_header_size(void) const;
	//!Getter for content size
	uint64_t get_content_size(void) const;
	//! Getter for width
	uint64_t get_width(void) const;
	//! Getter for height
	uint64_t get_height(void) const;
	//! Getter for image caption
	std::string get_caption(void) const;
	//! Getter for tags
	std::vector<std::string> get_tags(void) const;
	//! Getter for inner data
	std::shared_ptr<std::vector<uint8_t> > get_data(void);

    private:
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

	//! Parse header from data
	/*!
	 \param data Raw binary data to parse from
	 */
	uint64_t parse_header(const std::vector<uint8_t> &data);
};

#endif
