# compile-time flags
CXXFLAGS = -std=c++17 -Wall -Wextra -pedantic -Werror 
# add includes to cflags
INCLUDES = 
CXXFLAGS+= $(INCLUDES)

# define debug in cflags
ifdef DEBUG
	CXXFLAGS+= -Og -g -O0
endif

# Linker flags
LDFLAGS = -std=c++17

ifdef DEBUG
	LDFLAGS+= -g
endif

OBJS_COMMON := $(patsubst %.cpp,%.o,$(wildcard *.cpp))

# recipies
all: main


%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

main: main.o $(OBJS_COMMON)
	$(CXX) $(LDFLAGS) -o $@ $^

.PHONY: clean
# clean deletes every object file in the project and every binary from the "all" target
clean:
	$(RM) $(wildcard *.o) $(all)
