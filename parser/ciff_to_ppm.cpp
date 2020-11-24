#include "ciff_to_ppm.h"
#include <fstream>
#include <ios>

void ciff_to_ppm(ciff &c, std::string &filename)
{
	FILE *fp = fopen(filename.c_str(), "wb+");
	if (fp != nullptr) {
		fprintf(fp, "P3 %lu %lu 255\n", c.get_width(), c.get_height());
		size_t i = 0;
		for (auto s : *c.get_data()) {
			fprintf(fp, "%hhu ", s);
			i++;
			if (i == c.get_width()) {
				fprintf(fp, "\n");
				i = 0;
			}
		}
	} else {
		throw "Couldnt open file";
	}
	fclose(fp);
}

void ciff_to_ppm_p6(ciff &c, std::string &filename)
{
	std::ofstream fp(filename, std::ios::out | std::ios::binary);

	if (fp) {
		fp << "P6 " << c.get_width() << " " << c.get_height() << " 255"
		   << std::endl;

		for (auto s : *c.get_data()) {
			char d = s;

			fp.write(&d, 1);
		}
	} else {
		throw "Couldnt open file";
	}
	fp.close();
}
