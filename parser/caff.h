#ifndef __caff_h_
#define __caff_h_

#include "ciff.h"


#define HEADER 0x01
#define CREDITS 0x02
#define ANIMATION 0x03

class caff {
    public:
    private:

	std::vector<ciff> ciff_images; 
};

#endif
