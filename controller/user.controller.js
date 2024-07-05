import { response } from "express";
import User from "../model/user.model.js";
import { validationResult } from "express-validator";

export const signIn = async (request, response, next) => {
  try {
    let { email, password } = request.body;
    let result = await User.findOne(email, password);
    return result.length
      ? response
          .status(200)
          .json({ message: "sign in success", user: result[0] })
      : response.status(401).json({ error: "Bad request" });
  } catch (err) {
    return response.status(500).json({ error: "Internal Server Error" });
  }
};


export const update = (req, res, next) => {
  let { id, username, email, password } = req.body;
  User.update(id, username, email, password)
    .then((result) => {
      return res.status(200).json({ message: "Update successfully", result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ message: "Internal Server Error", err });
    });
};

export const Delete = (req , res , next )=>{
  let {id, username, email , password} = req.body;
  User.Delete(id, username, email , password)
  .then((result)=>{
    return res.status(200).json({message : "Delete successfully" , result})
  })
  .catch((err)=>{
    console.log(err)
    return res.status(401).json({message : "Internal Server Error Delete" , err})
  })
}



export const saveUser = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response
      .status(401)
      .json({ error: "Bad request", errorMessage: errors.array() });

  let { username, email, password } = request.body; //{username:'',email:'',password}
  // Save user into database
  let user = new User(null, username, email, password);
  user
    .create()
    .then((result) => {
      return response
        .status(201)
        .json({ message: "user created successfully" });
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ error: "Internal Server Error" });
    });
};
