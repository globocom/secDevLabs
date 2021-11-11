var db = connect("mongodb://localhost/mongection");

db.createUser(
    {
        user: "mongection",
        pwd: "mongection",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);