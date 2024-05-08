/*
 * DIRB
 *
 * html2dic.c - Genera un diccionario a partir de una pagina HTML
 * Ultima modificacion: 31/03/2005
 *
 * Idea de Warezzman, coded por Darkraver
 *
 */


// (!) AÒadir soporte para html en unicode

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char **argv) {
  char uno;
  int in_tag=0;
  int in_coded=0;
  int in_word=0;
  char buffer[1024];
  FILE *fd;
  char word[]="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_Ò·ÈÌÛ˙¡…Õ”⁄‡ËÏÚ˘¿»Ã“Ÿ";

  memset(buffer, 0, 1024);

  if(argc!=2) {
	printf("Uso: ./html2dic <file>\n");
	exit(-1); }

// Abriendo fichero

  fd=fopen(argv[1], "r");
  if(fd<=0) {
	perror("fopen");
	exit(-1); }

// Bucle de lectura de fichero -----------------------------------------------

  while(fread(&uno, 1, 1, fd)) {

    if(uno=='<') { in_tag=1; in_word=0; }

    if(uno=='&') in_coded=1;

    // Estamos en el texto

    if(!in_tag && !in_coded && uno!='\0') {
	  if(strchr(word, uno)) {
		if(!in_word) putchar('\n');
		in_word=1;
		putchar(uno);
	    }
      else in_word=0;
	  }

    // Analisis del tag html

    if(uno=='>') in_tag=0;

    // Analisis del caracter codificado

    if(in_coded && strlen(buffer)<1023) strncat(buffer, &uno, 1);

    if(uno==';') {
	  //printf("\n[ CODE: %s ]\n", buffer);
	  /*
	  if(strcmp(buffer, "&copy;")==0) putchar('©');
	  if(strcmp(buffer, "&#8216;")==0) putchar('ì');
	  if(strcmp(buffer, "&#8217;")==0) putchar('î');
	  if(strcmp(buffer, "&quot;")==0) putchar('\"');
	  if(strcmp(buffer, "&nbsp;")==0) putchar(' ');
	  if(strcmp(buffer, "&amp;")==0) putchar('&');
	  if(strcmp(buffer, "&lt;")==0) putchar('<');
	  if(strcmp(buffer, "&gt;")==0) putchar('>');
	  */
	  if(strcmp(buffer, "&ntilde;")==0) putchar('Ò');
	  if(strcmp(buffer, "&aacute;")==0) putchar('·');
	  if(strcmp(buffer, "&eacute;")==0) putchar('È');
	  if(strcmp(buffer, "&iacute;")==0) putchar('Ì');
	  if(strcmp(buffer, "&oacute;")==0) putchar('Û');
	  if(strcmp(buffer, "&uacute;")==0) putchar('˙');
	  if(strcmp(buffer, "&Aacute;")==0) putchar('¡');
	  if(strcmp(buffer, "&Eacute;")==0) putchar('…');
	  if(strcmp(buffer, "&Iacute;")==0) putchar('Õ');
	  if(strcmp(buffer, "&Oacute;")==0) putchar('”');
	  if(strcmp(buffer, "&Uacute;")==0) putchar('⁄');
	  if(strcmp(buffer, "&nbsp;")==0) in_word=0;
	  in_coded=0;
	  memset(buffer, 0, 1024);
      }

  }

// ---------------------------------------------------------------------------

  fclose(fd);

  exit(0);

}



