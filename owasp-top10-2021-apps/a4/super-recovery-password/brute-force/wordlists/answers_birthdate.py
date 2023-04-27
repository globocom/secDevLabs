import hashlib
import os
from num2words import num2words
from datetime import date, timedelta

# How we made answers_birthdate wordlist

TEMPORARY_FILE_NAME = "temp.txt"
FINAL_FILE_NAME = "answers_birthdate.txt"
MONTHS = {
    'pt_BR': {
        '1': 'janeiro',
        '2': 'fevereiro',
        '3': 'março',
        '4': 'abril',
        '5': 'maio',
        '6': 'junho',
        '7': 'julho',
        '8': 'agosto',
        '9': 'setembro',
        '10': 'outubro',
        '11': 'novembro',
        '12': 'dezembro'
    },
    'en': {
        '1': 'january',
        '2': 'february',
        '3': 'march',
        '4': 'april',
        '5': 'may',
        '6': 'june',
        '7': 'july',
        '8': 'august',
        '9': 'september',
        '10': 'october',
        '11': 'november',
        '12': 'december'
    }
}

class Colors:
    WARNING = '\033[33m'
    OKGREEN = '\033[32m'
    OKGREENLIGHT = '\033[1;32m'
    FAIL = '\033[31m'
    NORMAL = '\033[0m'

def make_wordlist():
    with open(TEMPORARY_FILE_NAME, "w", encoding='utf-8') as file:
        start_date = date(1930, 1, 1)
        end_date = date(2021, 12, 31)
        delta = timedelta(days=1)
        os_leading = '#' if os.name == 'nt' else '-' 

        while start_date <= end_date:
            y = start_date.strftime("%Y")
            m = start_date.strftime(f"%{os_leading}m")
            d = start_date.strftime(f"%{os_leading}d")

            day_pt_BR = num2words(d, lang='pt_BR')

            day_en = str(num2words(d, lang='en'))
            year_en = str(num2words(y, lang="en", to="year"))


            for s in (" ", "-", "/", " de "): 
                if s == " de ":
                    # 22 de janeiro de 1998
                    file.write(
                        f"{d}{s}{MONTHS['pt_BR'][m]}{s}{y}\n"
                    )
                    # vinte dois de janeiro de 1998
                    file.write(
                        f"{day_pt_BR}{s}{MONTHS['pt_BR'][m]}{s}{y}\n"
                    )
                    # 22 de janeiro
                    file.write(f"{d}{s}{MONTHS['pt_BR'][m]}\n")

                else:
                    for month in (m, f"{int(m):02d}"):
                        for day in (d, f"{int(d):02d}"):
                            # (0)2{s}(0)4{s}1999
                            file.write(f"{day}{s}{month}{s}{y}\n")

                            # (0)4{s}(0)2{s}1999
                            file.write(f"{month}{s}{day}{s}{y}\n")

                            # (0)2{s}(0)4
                            file.write(f"{day}{s}{month}\n")

                            # (0)4{s}(0)2
                            file.write(f"{month}{s}{day}\n")

                    if s == " ":
                        # january twenty-two
                        file.write(
                            f"{MONTHS['en'][m]}{s}{day_en}\n"
                        )
                        # twenty-two january
                        file.write(
                            f"{day_en}{s}{MONTHS['en'][m]}\n"
                        )
                        # january 23
                        file.write(
                            f"{MONTHS['en'][m]}{s}{d}\n"
                        )
                        # 23 january
                        file.write(
                            f"{d}{s}{MONTHS['en'][m]}\n"
                        )
                        if "-" in day_en or "-" in year_en:
                            # twenty two january
                            file.write(
                                f"{day_en.replace('-', '')}{s}{MONTHS['en'][m]}{s}{year_en.replace('-', '')}\n"
                            )
                            # january twenty two
                            file.write(
                                f"{MONTHS['en'][m]}{s}{day_en.replace('-', '')}\n"
                            )
            start_date += delta
    print(f"{Colors.OKGREEN}[SUCCESS]{Colors.NORMAL} {TEMPORARY_FILE_NAME} done.")
    remove_duplicates()
    remove_temporary_file()
    print(f"{Colors.OKGREENLIGHT}[FINAL WORDLIST DONE]{Colors.NORMAL} {FINAL_FILE_NAME}")

def remove_duplicates():
    try:
        completed_lines_hash = set()
        with open(FINAL_FILE_NAME, "w", encoding='utf-8') as out:
            with open(TEMPORARY_FILE_NAME, "r", encoding='utf-8') as temp:
                for line in temp:
                    hashValue = hashlib.md5(line.rstrip().encode('utf-8')).hexdigest()
                    if hashValue not in completed_lines_hash:
                        out.write(line)
                        completed_lines_hash.add(hashValue)
        print(f"{Colors.OKGREEN}[SUCCESS]{Colors.NORMAL} Duplicate messages removed.")
    except Exception as e:
        print(f"{Colors.FAIL}[FAIL] {str(e)}")

def remove_temporary_file():
    try:
        os.remove(TEMPORARY_FILE_NAME)
        print(f"{Colors.OKGREEN}[SUCCESS]{Colors.NORMAL} Temporary file removed.")
    except:
        try:
            with open(TEMPORARY_FILE_NAME, "w", encoding='utf-8'):
                pass
            print(f"{Colors.NORMAL}[MIDDLING SUCCESS] Temporary file only erased.")
        except Exception as e:
            print(f"{Colors.FAIL}[FAIL] removing {TEMPORARY_FILE_NAME} file {str(e)}")

if __name__ == '__main__':
    make_wordlist()