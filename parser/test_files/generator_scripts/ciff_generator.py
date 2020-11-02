import sys

def main():
	output = open("test.ciff", "wb+")
	output.write(generate_ciff())
	ciff = generate_pixels(255,255)
	output.write(ciff)




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
