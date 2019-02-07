var db = connect("mongodb://localhost/insecure_go_project");
db.createUser(
    {
        user: "huskyUser2613311233",
        pwd: "huskyPass31979227",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
