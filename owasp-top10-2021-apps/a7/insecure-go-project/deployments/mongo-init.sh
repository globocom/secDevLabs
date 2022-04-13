set -e

mongo <<EOF
db.createUser(
    {
        user: "xsxs",
        pwd: "wfe",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
);
EOF