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

        if (login.validateSync()) { 
            // TODO: Log suspected attacks here.
            // It's probably a good idea to log when a suspected attack occurs so that those monitoring
            // the system can be aware.
            // This section should only be entered if the username/password end up as `null`.
            // This would only happen if they were:
            //   a) not present in the request (unlikely, but possible)
            //   b) not a string (likely attempted attack)
            return []; 
        }

        const existsUser = await User.find({$and: [ { email: login.email}, { password: login.password} ]});

        if(!existsUser) { return [];}

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