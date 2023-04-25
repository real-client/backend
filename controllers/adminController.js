import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Admin {
  async getAllAdmins(req, res, next) {
    try {
      const response = await adminModel.find({});
      res.status(200).send({ success: true, response });
    } catch (error) {
      next(error);
    }
  }

  async getAdmin(req, res, next) {
    try {
      let { id } = req.params;
      const response = await adminModel.findOne({ _id: id });
      res.status(200).send({ success: true, response });
    } catch (error) {
      next(error);
    }
  }

  async editAdmin(req, res, next) {
    try {
      let id = { _id: req.params.id };
      let update = req.body;
      let response;
      if (req.body.password) {
        await bcrypt.hash(req.body.password, 10).then(function (hash) {
          update.password = hash;
        });
        response = await adminModel.findByIdAndUpdate(
          id,
          {
            $set: update,
          },
          { new: true }
        );
      } else {
        response = await adminModel.findByIdAndUpdate(
          id,
          {
            $set: update,
          },
          { new: true }
        );
      }
      res.status(200).send({ success: true, response });
    } catch (error) {
      next(error);
    }
  }

  async deleteAdmin(req, res, next) {
    try {
      let { id } = req.params;
      const response = await adminModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ success: true, response });
    } catch (error) {
      next(error);
    }
  }

  async addAdmin(req, res, next) {
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;

      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await adminModel.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      //Encrypt user password
      let encryptedPass = "";
      await bcrypt.hash(password, 10).then(function (hash) {
        encryptedPass = hash;
      });

      // Create user in our database
      const user = await adminModel.create({
        first_name: first_name,
        last_name: last_name,
        email: email.toLowerCase(), // sanitize
        password: encryptedPass,
      });

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.ADMIN_TOKEN_KEY,
        {
          expiresIn: "12h",
        }
      );
      // save user token
      user.token = token;

      // return new user
      res.status(201).json(user);
    } catch (error) {
      if (error) return next(error);
      return res.status(400).send(`Error: ${error}`);
    }
  }

  async login(req, res, next) {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await adminModel.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.ADMIN_TOKEN_KEY,
          {
            expiresIn: "12h",
          }
        );

        // save user token
        user.token = token;

        // user and cookies
        return res.cookie("token", token).status(200).json(user);
      }
    } catch (error) {
      if (error) return next(error);
      return res.status(400).send(`Error: ${error}`);
    }
  }

  async logout(req, res, next) {
    try {
      res
        .clearCookie("token")
        .status(200)
        .send({ status: 200, message: "Logged Out!" });
    } catch (error) {
      if (error) return next(error);
      return res.status(400).send(`Error: ${error}`);
    }
  }
}

const adminController = new Admin();
export default adminController;
