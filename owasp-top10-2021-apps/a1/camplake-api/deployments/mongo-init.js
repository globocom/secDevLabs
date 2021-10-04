var db = connect("mongodb://localhost/DB");
db.createUser(
    {
        user: "User3026519888",
        pwd: "Pass2401010199",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
