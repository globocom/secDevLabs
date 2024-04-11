mongo << EOF
db.createUser(
    {
        user: "$MONGO_USER",
        pwd: "$MONGO_PASSWORD",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
EOF

