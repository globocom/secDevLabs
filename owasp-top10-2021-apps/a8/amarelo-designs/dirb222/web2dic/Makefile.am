bin_PROGRAMS = html2dic

AM_CFLAGS = -Wall -g 

base = html2dic.c

html2dic_SOURCES = $(base)

CLEANFILES = core *.core *.o *~ *.stackdump output.txt

DISTCLEANFILES = autoconf.h stamp-auto-h autom4te*.cache

html2dic$(EXEEXT): $(html2dic_OBJECTS) 
	@rm -f html2dic$(EXEEXT)
	$(LINK) $(html2dic_OBJECTS) $(LIBS)
