const sanitize = require('mongo-sanitize');
const User = require('./models/user');

const register = async (user) => {

    try { 
        const { name, email, password } = user;

       const sanitized_user = {
              name: sanitize(name),
                email: sanitize(email),
                password: sanitize(password)
        }

        const existUser = await User.findOne({email: sanitized_user.email});

        if(existUser) { return null }

        const newUser = new User({
            name: sanitized_user.name,
            email: sanitized_user.email,
            password: sanitized_user.password
        });

        await newUser.save();

        return newUser;
    }

    catch(error) { throw error; }
    
}

const login = async (credentials) => {

    try {
        const { email, password } = credentials;

        const sanitized_credentials = {
            email: sanitize(email),
            password: sanitize(password)
        };

        const existsUser = await User.find({$and: [ { email: sanitized_credentials.email}, { password: sanitized_credentials.password} ]});

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