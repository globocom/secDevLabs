mongo -- "$MONGO_DB_NAME" <<EOF
var user = '$MONGO_USER';
var passwd = '$MONGO_PASSWORD';
var admin = db.getSiblingDB('admin');
admin.auth(user, passwd);
db.createUser({user: user, pwd: passwd, roles: [{ role: "userAdminAnyDatabase", db: "admin" }]});
EOF