# compile-time flags
CXXFLAGS = -std=c++17 -Wall -Wextra -pedantic -Werror -shared -fPIC
# add includes to cflags
INCLUDES = -I../extern/pybind11/include `python3-config --includes`
CXXFLAGS+= $(INCLUDES)

# define debug in cflags
ifdef DEBUG
	CXXFLAGS+= -Og -g -O0
endif

# Linker flags
LDFLAGS = -std=c++17 -shared -fPIC

ifdef DEBUG
	LDFLAGS+= -g
endif

OBJS_COMMON := $(patsubst %.cpp,%.o,$(wildcard *.cpp))

TARGET_LIB_NAME := parser`python3-config --extension-suffix`


# recipies
all: main


%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

main: main.o $(OBJS_COMMON)
	$(CXX) $(LDFLAGS) -o $(TARGET_LIB_NAME) $^

.PHONY: clean
# clean deletes every object file in the project and every binary from the "all" target
clean:
	$(RM) $(wildcard *.o) $(all) $(TARGET_LIB_NAME)
