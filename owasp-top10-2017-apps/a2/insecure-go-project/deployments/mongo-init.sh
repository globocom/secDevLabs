mongo "$DATABASE" <<EOF
var user = '$DATABASE_USER';
var pwd = '$DATABASE_PASS';
var admin = db.getSiblingDB('admin');
admin.auth(user, pwd);
db.createUser({user: user, pwd: pwd, roles: ["readWrite"]});
EOF