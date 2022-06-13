var db = connect("mongodb://localhost/DB");
db.createUser(
    {
        user: "User77834151",
        pwd: "Pass574422970",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
