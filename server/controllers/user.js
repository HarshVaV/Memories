import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test'; //secretKey: use for encryption

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    //unregisted-user
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    //wrong password
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    
    //encrypt userData and store as JWT-token
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
        // jwt.sign(userObj, secretKey, expiration-period)

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    //alredy Registed-user
    if (oldUser) return res.status(400).json({ message: "User already exists" });
    //store encryted passWord
    const hashedPassword = await bcrypt.hash(password, 12);
    // store userInfo + encrypted-Password (iff newUser)
    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    //encrypt userData and store as JWT-token
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};