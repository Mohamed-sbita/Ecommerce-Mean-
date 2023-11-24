const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcrypt");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class Auth {
  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { firstName, lastName, email, password } = req.body;
    let error = {};
    if (!firstName && !lastName && !email && !password) {
      error = {
        ...error,
        firstName: "Filed must not be empty",
        lastName: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty",
      };
      return res.json({ error });
    }

    if (!firstName) {
      error = {
        ...error,
        firstName: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (!lastName) {
      error = {
        ...error,
        lastName: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (!email) {
      error = {
        ...error,
        email: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (!password) {
      error = {
        ...error,
        password: "Filed must not be empty",
      };
      return res.json({ error });
    }

    if (firstName.length < 3 || firstName.length > 25) {
      error = { ...error, firstName: "first name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        firstName = toTitleCase(firstName);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            firstName: "",
            lastName: "",
            email: "",
          };
          return res.json({ error });
        } else {
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                firstName: "",
                lastName: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
              let newUser = new userModel({
                firstName,
                lastName,
                email,
                password,
                
                userRole: 0, // admin = 1 or user = 0
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Account create successfully. Please login",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          firstName: "",
          lastName: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* User Login/Signin controller ______________________________login__________________________________ */
  async postSignin(req, res) {
    let { email, password } = req.body;
    let error = {};
    
    if (!email && !password) {
      error = {
        ...error,
        email: "Filed must not be empty",
        password: "Filed must not be empty",
      };
      return res.json({
        error,
      });
    }
    if (!email) {
      error = {
        ...error,
        email: "Filed must not be empty",
      };
      return res.json({
        error,
      });
    }
    if (!validateEmail(email)) {
      error = {
        ...error,
        email: "email not valid !",
      };
      return res.json({
        error,
      });
    }
    if (!password) {
      error = {
        ...error,
        password: "Filed must not be empty",
      };
      return res.json({
        error,
      });
    }
   

    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id, role: data.userRole },
            process.env.JWTSECRET
          );
          const encode = jwt.verify(token, process.env.JWTSECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();
module.exports = authController;
