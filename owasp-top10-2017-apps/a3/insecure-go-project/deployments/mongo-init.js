var db = connect("mongodb://localhost/insecure_go_project");
var pbkdf2 = require('pbkdf2');
var protectedKey = pbkdf2.pbkdf2Sync('secret', 'salt', 1000, 32, 'sha512')

db.createUser(
    {
        user: "u_insecure_go_project",
        pwd: protectedKey,
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
