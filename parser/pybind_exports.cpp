
#include "../extern/pybind11/include/pybind11/pybind11.h" 
#include "../extern/pybind11/include/pybind11/stl.h"


#include "ciff.h"
#include "caff.h"
#include "ciff_to_ppm.h"


namespace py = pybind11; 

//PYBIND11_MAKE_OPAQUE(std::shared_ptr<std::vector<uint8_t>>);

PYBIND11_MODULE(parser, m)
{
	//py::class_<std::shared_ptr<std::vector<uint8_t>>>(m, "enc_data");
	py::class_<ciff, std::shared_ptr<ciff> >(m ,"ciff")
	.def(py::init<const std::string>())
	.def(py::init<std::vector<uint8_t>&>())
	.def("get_header_size", &ciff::get_header_size)
	.def("get_content_size", &ciff::get_content_size)
	.def("get_width", &ciff::get_width)
	.def("get_height", &ciff::get_height)
	.def("get_caption", &ciff::get_caption)
	.def("get_tags", &ciff::get_tags);


	py::class_<caff_credits>(m, "caff_credits")
		.def_readwrite("year", &caff_credits::year)
		.def_readwrite("month", &caff_credits::month)
		.def_readwrite("day", &caff_credits::day)
		.def_readwrite("hour", &caff_credits::hour)
		.def_readwrite("minute", &caff_credits::minute)
		.def_readwrite("creator_len", &caff_credits::creator_len)
		.def_readwrite("creator", &caff_credits::creator);

	py::class_<caff>(m, "caff")
	.def(py::init<const std::string&>())
	.def(py::init<std::vector<uint8_t>&>())
	.def("get_durations", &caff::get_durations)
	.def("get_ciff_images", &caff::get_ciff_images)
	.def("get_caff_credits", &caff::get_caff_credits)
	.def("get_caff_header", &caff::get_caff_header);



	m.def("ciff_to_ppm", &ciff_to_ppm);
}



