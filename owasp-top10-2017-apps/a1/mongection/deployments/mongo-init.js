var db = connect("mongodb://localhost/mongection");

db.createUser(
    {
        user: "mongection",
        pwd: "C4n_Y0u_PW-me!",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);