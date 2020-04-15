var db = connect("mongodb://localhost/coolgames");
db.createUser(
    {
        user: "User1964110909",
        pwd: "Pass1658131492",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
