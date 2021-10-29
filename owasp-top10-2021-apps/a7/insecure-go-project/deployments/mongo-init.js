var db = connect("mongodb://localhost/insecure_go_project");

db.createUser(
    {
        user: "u_insecure_go_project",
        pwd: "svGX8SViufvYYNu6m3Kv",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
