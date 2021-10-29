var db = connect("mongodb://localhost/snake_pro");

db.createUser(
    {
        user: "u_snake_pro",
        pwd: "svGX8SViufvYYNu6m3Kv",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
