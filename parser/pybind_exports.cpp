
#include "../extern/pybind11/include/pybind11/pybind11.h"
#include "../extern/pybind11/include/pybind11/stl.h"

#include "ciff.h"
#include "caff.h"
#include "ciff_to_ppm.h"
#include "exceptions.h"

namespace py = pybind11;

//PYBIND11_MAKE_OPAQUE(std::shared_ptr<std::vector<uint8_t>>);

PYBIND11_MODULE(parser, m)
{

	py::register_exception<ciff_exception>(m, "CiffException");
	py::register_exception<magic_exception>(m, "MagicException");
	py::register_exception<parse_failed>(m, "ParseFailed");

	//py::class_<std::shared_ptr<std::vector<uint8_t>>>(m, "enc_data");
	py::class_<ciff, std::shared_ptr<ciff> >(m, "Ciff")
		.def(py::init<const std::string>())
		.def(py::init<std::vector<uint8_t> &>())
		.def("GetHeaderSize", &ciff::get_header_size)
		.def("GetContentSize", &ciff::get_content_size)
		.def("GetWidth", &ciff::get_width)
		.def("GetHeight", &ciff::get_height)
		.def("GetCaption", &ciff::get_caption)
		.def("GetTags", &ciff::get_tags);

	py::class_<caff_credits>(m, "CaffCredits")
		.def_readwrite("Year", &caff_credits::year)
		.def_readwrite("Month", &caff_credits::month)
		.def_readwrite("Day", &caff_credits::day)
		.def_readwrite("Hour", &caff_credits::hour)
		.def_readwrite("Minute", &caff_credits::minute)
		.def_readwrite("CreatorLen", &caff_credits::creator_len)
		.def_readwrite("Creator", &caff_credits::creator);

	py::class_<caff>(m, "Caff")
		.def(py::init<const std::string &>())
		.def(py::init<std::vector<uint8_t> &>())
		.def("GetDurations", &caff::get_durations)
		.def("GetCiffImages", &caff::get_ciff_images)
		.def("GetCaffCredits", &caff::get_caff_credits)
		.def("GetCaffHeader", &caff::get_caff_header);

	m.def("CiffToPpm", &ciff_to_ppm);
}
