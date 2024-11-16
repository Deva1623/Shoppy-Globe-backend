import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// function to register a new user------------------------------
export const registerUser = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // check if the user is already registered
        const alreadyRegistered = await User.findOne({ userName });
        if (alreadyRegistered) {
            return res.json({ message: 'User already registered' }); // inform if the user exists
        }

        // create a new user and save it to the database
        const newUser = new User({ userName, password });
        await newUser.save();

        res.json({ message: 'User registered successfully' }); // confirm registration success
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' }); // handle any unexpected errors
    }
};

// function to log in an existing user------------------------------------------
export const loginUser = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // check if the user exists in the database
        const userExist = await User.findOne({ userName });
        if (!userExist) {
            return res.status(404).json({ message: 'User not registered' }); // tell user they need to register first
        }

        // compare the entered password with the one in the database
        const isPassCorrect = (password === userExist.password);
        if (!isPassCorrect) {
            return res.status(400).json({ message: 'Invalid password' }); // tell user if  password is wrong
        }

        // create a jwt token for  user, valid for 1 hour
        const jwtToken = jwt.sign({ userId: userExist.userName }, 'diwakar', { expiresIn: '1h' });

        res.json({ message: 'Login successful', jwtToken }); // send the token back to the user
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' }); // handle unexpected errors
    }
};
