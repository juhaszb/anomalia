import sys

def main():
	output = open("test.caff", "wb+")
	output.write(generate_header(1, 20))
	output.write(generate_caff_header(20, 1))
	output.write(generate_header(2, 20))
	output.write(generate_credits(2020,10,10,12,42,"almafa"))
	anim = generate_anim()
	ciff = generate_ciff()
	pixels = generate_pixels(255, 255)
	output.write(generate_header(3, len(anim+ciff+pixels)))	
	output.write(anim)
	output.write(ciff)
	output.write(pixels)
	output.close()


def generate_header(id, length):
	ret = bytes([id]) + length.to_bytes(8, sys.byteorder)
	return ret

def generate_caff_header(header_size, num_anim):
	magic = "CAFF"
	ret = magic.encode('ASCII') + header_size.to_bytes(8, sys.byteorder) + num_anim.to_bytes(8, sys.byteorder)
	return ret

def generate_credits(year, month, day, hour, minute, creator):
	ret = year.to_bytes(2, sys.byteorder) + month.to_bytes(1, sys.byteorder) + day.to_bytes(1, sys.byteorder) + hour.to_bytes(1, sys.byteorder) + minute.to_bytes(1, sys.byteorder) + len(creator).to_bytes(8, sys.byteorder) + creator.encode('ASCII')
	return ret


def generate_anim():
	duration = 1
	ret = duration.to_bytes(8, sys.byteorder)
	return ret

def generate_ciff():
	magic = "CIFF"
	caption = "Cap\n"
	tags = "this\0thag\0"
	header_size = 4 + 4*8 + len(caption) + len(tags)
	w = 255
	h = 255
	content_size = w*h*3

	ret = magic.encode('ASCII') + header_size.to_bytes(8, sys.byteorder) + content_size.to_bytes(8, sys.byteorder) + w.to_bytes(8, sys.byteorder) + h.to_bytes(8, sys.byteorder) + caption.encode('ASCII') + tags.encode('ASCII')
	return ret

def generate_pixels(w, h):
	array = []
	file = open("test.ppm", "w+")
	file.write("P3\n")
	file.write("255 255\n")
	file.write("255\n")

	for i in range(w):
		for j in range(h):
			x = j % 255
			y = i % 255
			z = i * j % 255
			file.write(str(x) + " " + str(y) + " " + str(z) + "\n")
			array.append(x)
			array.append(y)
			array.append(z)

	file.close()

	return bytes(array)

if __name__ == "__main__":
	main()
