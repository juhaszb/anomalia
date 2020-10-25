#ifndef __exceptions_h_
#define __exceptions_h_

#include <exception>
#include <string>

class ciff_exception: public std::exception
{
	const char * what () const throw () = 0;
};

class magic_exception: public ciff_exception
{
public:
	magic_exception( const std::string& magic): magic{magic} {};

	const char * what () const throw()
	{
		return magic.c_str();	
	}
private:
	std::string magic;
};

#endif
