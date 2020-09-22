const User = require('./models/user');
const Login = require('./models/login');

const register = async (user) => {

    try { 
        const { name, email, password } = user;

        const existUser = await User.findOne({email: email});

        if(existUser) { return null }

        const newUser = new User({
            name: name,
            email: email,
            password: password
        });

        await newUser.save();

        return newUser;
    }

    catch(error) { throw error; }
    
}

const login = async (credentials) => {

    try {
        const login = new Login(credentials);

        if (login.validateSync()) { return null; }

        const existsUser = await User.find({$and: [ { email: login.email}, { password: login.password} ]});

        if(!existsUser) { return null;}

        const returnUser = existsUser.map((user) => {
            return user.email
        })


        return returnUser;
    }

    catch(error) { throw error; }
    

}

module.exports = {
    register,
    login
};