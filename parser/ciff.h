#ifndef __ciff_h_
#define __ciff_h_

#include <string>
#include <vector>
#include <array>
#include <memory>

#define CIFF_MAGIC "CIFF" 


class ciff
{
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
	ciff(std::vector<uint8_t>&& data);


	//! Copy constructor
	ciff(const ciff& c);


	//! Move constructor
	ciff(ciff&& c);

	//! Destructor
	~ciff() = default;



private:
	unsigned long long int header_size; /*!Header size, 8 byte long field.*/
	unsigned long long int content_size; /*! Content size, 8 byte long field.*/
	unsigned long long int width; /*!Width of the image, 8 byte long, can be zero.  */
	unsigned long long int height;/*! Height of the image, 8 byte long, can be zero. */
	std::string caption; /*! Caption of the image, cannot contain \n */
	std::vector<std::string> tags; /*! Image tags */
	
	std::unique_ptr<std::vector<uint8_t>> data; /*! Pixel data */

	enum parse_state {magic, header_s, content_s, w, h, capt, tag, dat, done}; /*! Enum for parsing, internal use only */

	parse_state p = magic;

	void parse_from_data(const std::vector<uint8_t>& data);	

};



#endif
