export class UserUtil {
  static get user() {
    let username = localStorage.getItem('username');

    if(!username) {
      let number = Math.floor(Math.random() * 100);
      username = `anonymous${number}`;
      localStorage.setItem('username', username);
    }

    return username;
  } 
}