import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    const { username, email, password } = req.body
    if(!username || !email || !password){
        res.status(400).json('all fields are required')
        return
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    try {
        await newUser.save()
        res.status(200).json("Signup successful")
    } catch(err) {
        res.status(400).json("Error occured: ", err)
    }
}