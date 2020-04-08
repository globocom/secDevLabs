mongo <<EOF
var db = connect("mongodb://localhost/$MONGO_DBNAME");

db.createUser(
    {
        user: "$MONGO_USER",
        pwd: "$MONGO_PASSWORD",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
EOF
