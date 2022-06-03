var db = connect("mongodb://localhost/DB");
db.createUser(
    {
        user: "User129764015",
        pwd: "Pass242021061",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
