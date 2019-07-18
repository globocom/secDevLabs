function sendResult(result){
    const cookie = getCookie('tictacsession')
    const payload = JSON.parse(window.atob(cookie.split('.')[1])); 
    const form = {
        user: payload.username,
        result: result,
    }
    const options = {
        method: 'POST',
        body: new URLSearchParams(form)
    }
    fetch('http://localhost.:10005/game', options)
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function login(event){
    event.preventDefault();
    const data = new FormData(event.target)
    const options = {
        method: 'POST',
        body: new URLSearchParams(data)
    }
    fetch('http://localhost.:10005/login', options)
        .then(resp =>  {
            if(!resp.ok){
                return resp.json()
                    .then(data => ({status: resp.ok, body: data}))
            }
            return {status: resp.status}
        }
        )
        .then( obj => {
            if (!obj.status){
                document.getElementById('message').innerHTML = obj.body.msg
                document.getElementById('message').classList.add("messageBox")
            }else{
                window.location.href = 'home';
            }
        })
}

function createAccount(event){
    event.preventDefault();
    const data = new FormData(event.target)

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: new URLSearchParams(data)
    }
    fetch('http://localhost.:10005/create', options)
        .then(resp =>  {
            if(!resp.ok){
                return resp.json()
                    .then(data => ({status: resp.ok, body: data}))
            }
            return {status: resp.status}
        }
        )
        .then( obj => {
            if (!obj.status){
                document.getElementById('message').innerHTML = obj.body.msg
                document.getElementById('message').classList.add("messageBox")
            }else{
                window.location.href = 'login';
            }
        })
}