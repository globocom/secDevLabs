/*
 * DIRB
 *
 * dirb.c - Nucleo central del programa
 *
 */

#include "dirb.h"


/*
 * MAIN: Nucleo del programa
 *
 */

int main(int argc, char **argv) {
  struct words *palabras;
  int c=0;

  banner();

  // Inicializaciones globales

  memset(&options, 0, sizeof(struct opciones));

  options.exitonwarn=1;
  options.ignore_nec=0;
  options.default_nec=404;
  options.lasting_bar=1;
  options.speed=0;
  options.add_header=0;

  encontradas=0;
  descargadas=0;
  listable=0;
  exts_num=0;

  strncpy(options.agente, AGENT_STRING, STRING_SIZE-1);

  dirlist_current=(struct words *)malloc(sizeof(struct words));
  memset(dirlist_current, 0, sizeof(struct words));
  dirlist_base=dirlist_current;
  dirlist_final=dirlist_current;

  curl=curl_easy_init();

  // Recepcion de parametros

  if(argc<2) {
    ayuda();
    exit(-1);
    }

  if(strncmp(argv[1], "-resume", 7)==0) {
    printf("(!) RESUMING...\n\n");
    resume();
    }

  strncpy(options.url_inicial, argv[1], STRING_SIZE-1);

  if(argc==2 || strncmp(argv[2], "-", 1)==0) {
    strncpy(options.mfile, "/usr/share/dirb/wordlists/common.txt", STRING_SIZE-1);
    optind+=1;
    } else {
    strncpy(options.mfile, argv[2], STRING_SIZE-1);
    optind+=2;
    }

  while((c = getopt(argc,argv,"a:c:d:fgh:H:ilm:M:n:N:o:p:P:rRsSvwx:X:u:tz:"))!= -1){
    switch(c) {
      case 'a':
        options.use_agent=1;
        strncpy(options.agente, optarg, STRING_SIZE-1);
        break;
      case 'c':
        options.use_cookie=1;
        strncpy(options.cookie, optarg, STRING_SIZE-1);
        break;
      case 'd':
        options.debuging=atoi(optarg);
        break;
      case 'f':
        options.finetunning=1;
        break;
      case 'g':
        options.save_found=1;
        break;
      case 'h':
        options.use_vhost=1;
        strncpy(options.vhost, optarg, STRING_SIZE-1);
        break;
      case 'H':
        if(options.add_header) {
          strcat(options.header_string, "\n");
          strncat(options.header_string, optarg, STRING_SIZE-strlen(options.header_string)-2);
          } else {
  	      strncpy(options.header_string, optarg, STRING_SIZE-1);
	      }
        options.add_header++;
        break;
      case 'i':
        options.insensitive=1;
        break;
      case 'l':
        options.print_location=1;
        break;
      case 'm':
        options.mutations_file=1;
        strncpy(options.mutation_file, optarg, STRING_SIZE-1);
        break;
      case 'M':
        options.mutations_list=1;
        strncpy(options.mutation_list, optarg, STRING_SIZE-1);
        break;
      case 'N':
        options.ignore_nec=atoi(optarg);
        break;
      case 'o':
        options.saveoutput=1;
        strncpy(options.savefile, optarg, STRING_SIZE-1);
        break;
      case 'p':
        options.use_proxy=1;
        strncpy(options.proxy, optarg, STRING_SIZE-1);
        break;
      case 'P':
        options.use_proxypass=1;
        strncpy(options.proxypass_string, optarg, STRING_SIZE-1);
        break;
      case 'r':
        options.dont_recurse=1;
        break;
      case 'R':
        options.interactive=1;
        break;
      case 's':
        options.verify_ssl=1;
        break;
      case 'S':
        options.silent_mode=1;
        break;
      case 't':
        options.lasting_bar=0;
        break;
      case 'u':
        options.use_pass=1;
        strncpy(options.pass_string, optarg, STRING_SIZE-1);
        break;
      case 'v':
        options.nothide=1;
        break;
      case 'w':
        options.exitonwarn=0;
        break;
      case 'x':
        options.extensions_file=1;
        strncpy(options.exts_file, optarg, STRING_SIZE-1);
        break;
      case 'X':
        options.extensions_list=1;
        strncpy(options.exts_list, optarg, STRING_SIZE-1);
        break;
      case 'z':
        options.speed=(atoi(optarg)<=0)?0:atoi(optarg);
        break;
      default:
        printf("\n(!) FATAL: Incorrect parameter\n");
        exit(-1);
        break;
        }
      }

  // Limpia el input

  limpia_url(options.url_inicial);

  if(options.lasting_bar && !strchr(options.url_inicial, '?')) barra(options.url_inicial);

  check_url(options.url_inicial);

  limpia_url(options.mfile);

  // Chequeos iniciales

  get_options();

  init_exts();

  IMPRIME("\n-----------------\n\n");

  // Creamos la lista de palabras

  palabras=crea_wordlist(options.mfile);

  // Abrimos el fichero de mutations y creamos la lista

  /*

  if(options.mutations_file) {
    muts_base=crea_wordlist_fich(options.mutation_file);
    } else if(options.mutations_list) {
    muts_base=crea_extslist(options.mutation_list);
    }
  */

  // Lanzamos el bucle de descarga

  lanza_ataque(options.url_inicial, palabras);

  // Finalizamos

  cierre();
  exit(0);

}



/*
 * BANNER: Muestra el banner de presentacion del programa
 *
 */

void banner(void) {

  printf("\n");
  printf("-----------------\n");
  printf("DIRB v"VERSION"    \n");
  printf("By The Dark Raver\n");
  printf("-----------------\n");
  printf("\n");

}


/*
 * OPCIONES: Muestra el menu de opciones disponibles
 *
 */

void ayuda(void) {

  printf("./dirb <url_base> [<wordlist_file(s)>] [options]\n");

  printf("\n========================= NOTES =========================\n");
  printf(" <url_base> : Base URL to scan. (Use -resume for session resuming)\n");
  printf(" <wordlist_file(s)> : List of wordfiles. (wordfile1,wordfile2,wordfile3...)\n");

  printf("\n======================== HOTKEYS ========================\n");
  printf(" 'n' -> Go to next directory.\n");
  printf(" 'q' -> Stop scan. (Saving state for resume)\n");
  printf(" 'r' -> Remaining scan stats.\n");

  printf("\n======================== OPTIONS ========================\n");
  printf(" -a <agent_string> : Specify your custom USER_AGENT.\n");
  printf(" -c <cookie_string> : Set a cookie for the HTTP request.\n");
  // printf(" -d <debug_level> : Activate DEBUGing.\n");
  printf(" -f : Fine tunning of NOT_FOUND (404) detection.\n");
  // printf(" -g : Save found URLs to disk. (Still not implemented)\n")
  // printf(" -h <vhost_string> : Use your custom Virtual Host header.\n");
  printf(" -H <header_string> : Add a custom header to the HTTP request.\n");
  printf(" -i : Use case-insensitive search.\n");
  printf(" -l : Print \"Location\" header when found.\n");
  // printf(" -M <mutations> / -m <muts_file> : Mutate found URLs with this extensions.\n");
  // printf(" -n <url>: Use the response for this URL as NEC.\n");
  printf(" -N <nf_code>: Ignore responses with this HTTP code.\n");
  printf(" -o <output_file> : Save output to disk.\n");
  printf(" -p <proxy[:port]> : Use this proxy. (Default port is 1080)\n");
  printf(" -P <proxy_username:proxy_password> : Proxy Authentication.\n");
  printf(" -r : Don't search recursively.\n");
  printf(" -R : Interactive recursion. (Asks for each directory)\n");
  // printf(" -s : Verify the validity of the peer's SSL certificate.\n");
  printf(" -S : Silent Mode. Don't show tested words. (For dumb terminals)\n");
  printf(" -t : Don't force an ending '/' on URLs.\n");
  printf(" -u <username:password> : HTTP Authentication.\n");
  printf(" -v : Show also NOT_FOUND pages.\n");
  printf(" -w : Don't stop on WARNING messages.\n");
  printf(" -X <extensions> / -x <exts_file> : Append each word with this extensions.\n");
  printf(" -z <milisecs> : Add a miliseconds delay to not cause excessive Flood.\n");

  printf("\n======================== EXAMPLES =======================\n");
  printf(" ./dirb http://url/directory/ (Simple Test)\n");
  printf(" ./dirb http://url/ -X .html (Test files with '.html' extension)\n");
  printf(" ./dirb http://url/ /usr/share/dirb/wordlists/vulns/apache.txt (Test with apache.txt wordlist)\n");
  printf(" ./dirb https://secure_url/ (Simple Test with SSL)\n");

}


