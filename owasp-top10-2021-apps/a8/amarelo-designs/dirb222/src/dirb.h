/*
 * DIRB
 *
 * dirb.h - Main Includes
 *
 */


#include "global.h"
#include "variables.h"
#include "estructuras.h"
#include "funciones.h"




/* MACROs */

#define   IMPRIME(f, s...)  printf(f, ## s); if(options.saveoutput) fprintf(outfile, f, ## s);








