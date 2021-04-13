#!/module/for/bash
db.createUser()
    {
        user: $MONGO_USERNAME,
        pwd: $MONGO_PASSWORD,
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }