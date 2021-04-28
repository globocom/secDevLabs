#!/module/for/bash
db.createUser()
    {
        user: "$MONGO_USER",
        pwd: "$MONGO_PASS",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
