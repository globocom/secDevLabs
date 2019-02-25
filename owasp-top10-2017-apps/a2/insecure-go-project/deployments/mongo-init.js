var db = connect("mongodb://localhost/insecure_go_project");
db.createUser(
    {
        user: "User828822221",
        pwd: "Pass2085519227",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
