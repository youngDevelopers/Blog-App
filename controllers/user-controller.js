import User from "../model/User";
import bcrypt from "bcrypt";

export const getAllUsers = async(req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch(err) {
        console.log(err);
    }
    if(!users) {
        return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({users});
}

//public rouute
export const signup = async(req, res, next) => {
    //destructuring request data
    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    } catch(err) {
        console.log(err)
    }
    if(existingUser){
        return res.status(400).json({message: "User Already Exist! Login Instead"})
    }
    //hashing the password
    const hashed_password = await bcrypt.hashSync(password, 10);

    //Creating new user 
    const user = await new User({
      name,
      email,
      password: hashed_password,
      blogs: [],//initialising the list of blogs created to zero during user creation
    });

    //saving new user to the database
    try {
        await user.save();//saving user into database
    } catch (err) {
        console.log(err)
    }
    return res.status(201).json({user});
};

//public route
export const login = async(req, res, next) => {
    const {email, password } = req.body;

    let existinguser;
    try {
        existinguser = await User.findOne({email})
    } catch (err) {
        console.log(err)
    }
    if (!existinguser) {
        return res.status(404).json({ message: "Could'nt Find User By This Email" })
    }

    const isPasswordCorrect = await bcrypt.compareSync(password, existinguser.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" })
    }
    return res.status(200).json({ message: "Login Successful" })
}