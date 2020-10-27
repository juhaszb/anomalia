#include "ciff_to_ppm.h"
#include <fstream>
#include <ios>


void ciff_to_ppm(ciff& c, std::string& filename)
{

	FILE * fp = fopen(filename.c_str(), "wb+");
	if(fp != nullptr )
	{
		fprintf(fp, "P3 %lu %lu 255\n", c.get_width(), c.get_height());
		size_t i = 0;
		for( auto s: *c.get_data())
		{
			fprintf(fp, "%hhu ",s);
			i++;
			if( i == c.get_width())
			{
				fprintf(fp, "\n");
				i = 0;
			}
		}
	}
	else
	{
		throw "Couldnt open file";
	}
	fclose(fp);
}
