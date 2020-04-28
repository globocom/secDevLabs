var db = connect("mongodb://localhost/coolgames");
db.createUser(
    {
        user: "User60222444",
        pwd: "Pass191198596",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
