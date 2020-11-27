# Parser Documentation

This parser is written in C++, and uses the pybind11 library to generate a shared object that can be imported into python.

## Features

* Parse .caff files from an array or from a file
* Parse .ciff files from an array or from a file
* You can access all the fields of the parsed .caff and .ciff files (such as creator, tags, etc.)
* Write a .ciff file to .ppm format (both P3 and P6 versions)

All of these functions are exported to python using the pybind11 library.

## Installation

1. Clone this github repository
2. Run `git submodule update --init`
3. Run `make`
4. You can import the resulting .so file from python

## Example

Below you will find a minimal working example to parse a .caff file and write it to a .ppm file.

```python
import parser
Caff c = parser.Caff("test.caff")
parser.ciff_to_ppm(c.get_ciff_images()[0], "test.ppm")
```

## Testing

This program is tested using infer, valgrind and afl fuzzer.
During testing we don't want to generate a shared object file instead I use a minimal main program (that creates a caff object) and read the data from stdin in binary format.

### Valgrind results

I ran valgrind using all three provided test files. Neither of them reported memory leak.
![vaglrind results](https://user-images.githubusercontent.com/15946784/100473081-d4248180-30dd-11eb-9df9-af31dbf38853.png)

### Infer results

![image](https://user-images.githubusercontent.com/15946784/100483236-9b45d600-30f8-11eb-8e3a-773e54bf433d.png)

### AFL results

![image](https://user-images.githubusercontent.com/15946784/100479150-a0515800-30ed-11eb-8b37-d91a7ad23220.png)

Initially AFL found a few bugs, the most notable of these were:

* SIGABRT, caused by not propagating throws correctly
* SIGSEGV, Caused by accessing memory not owned
```c++
uint64_t length = ...; // some large length, close to UINT64_MAX
std::vector<uint8_t> data;
std::vector<uint8_t>::iterator it = data.begin();
if (data.end() < it + length) // it + length exceeds uint64_t so it overflows and the statement will be true, but the iterator it+length will point to garbage
```
