import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class User {
  async getAllUsers(req, res, next) {
    try {
      const response = await userModel.find({});
      res.status(200).send({ success: true, response });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      let { id } = req.params;
      const response = await userModel.findOne({ _id: id });
      res.status(200).send({ success: true, response });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      let { id } = req.params;
      const response = await userModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ success: true, response });
    } catch (error) {
      next(error);
    }
  }

  async editUser(req, res, next) {
    try {
      let id = { _id: req.params.id };
      let update = req.body;
      let response;
      if (req.body.password) {
        await bcrypt.hash(req.body.password, 10).then(function (hash) {
          update.password = hash;
        });
        response = await userModel.findByIdAndUpdate(
          id,
          {
            $set: update,
          },
          { new: true }
        );
      } else {
        response = await userModel.findByIdAndUpdate(
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

  async register(req, res, next) {
    try {
      // Get user input
      const {
        first_name,
        last_name,
        father_name,
        title,
        uni_role,
        gender,
        phone,
        date_of_birth,
        nationality,
        residence,
        student_id,
        special_needs,
        active_email,
        faculty,
        branch,
        is_lu_students,
        password,
        lu_role,
        uni_email,
        verified,
        event,
        opportunity,
      } = req.body;

      // Validate user input
      if (
        !(
          first_name &&
          last_name &&
          father_name &&
          title &&
          uni_role &&
          gender &&
          phone &&
          nationality &&
          date_of_birth &&
          residence &&
          student_id &&
          special_needs &&
          active_email &&
          faculty &&
          branch &&
          is_lu_students &&
          password
        )
      ) {
        return res.status(400).send("Please fill the required inputs");
      }

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await userModel.findOne({ active_email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      let encryptedPass = "";
      //Encrypt user password
      await bcrypt.hash(password, 10).then(function (hash) {
        encryptedPass = hash;
      });

      // Create user in our database
      const user = await userModel.create({
        first_name: first_name,
        last_name: last_name,
        father_name: father_name,
        title: title,
        uni_role: uni_role,
        gender: gender,
        phone: phone,
        date_of_birth: date_of_birth,
        nationality: nationality,
        residence: residence,
        student_id: student_id,
        special_needs: special_needs,
        active_email: active_email,
        faculty: faculty,
        branch: branch,
        is_lu_students: is_lu_students,
        password: encryptedPass,
        lu_role: lu_role,
        uni_email: uni_email,
        verified: verified,
        event: event,
        opportunity: opportunity,
      });

      // Create token
      const token = jwt.sign(
        { user_id: user._id, active_email },
        process.env.USER_TOKEN_KEY,
        {
          expiresIn: "5h",
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
      let { active_email, password } = req.body;

      // Validate user input
      if (!(active_email && password)) {
        res.status(400).send("All input is required");
      }

      // Get User
      const user = await userModel.findOne({ active_email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, active_email },
          process.env.USER_TOKEN_KEY,
          {
            expiresIn: "24h",
          }
        );

        // save user token
        user.token = token;

        // user and cookies
        return res.cookie("token", token).status(200).json(user);
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      next(error);
    }
  }
}

const userController = new User();
export default userController;

// refresh token
// 2 factor authentication
// oauth ()
// social

export const register = async (req, res, next) => {
  try {
    // Get user input
    const {
      first_name,
      last_name,
      father_name,
      title,
      role,
      date_of_birth,
      gender,
      phone,
      nationality,
      residence,
      student_id,
      special_needs,
      lu_email,
      active_email,
      password,
      faculty,
      branch,
      privacy_consent,
      privacy_policy_agreement,
      verified,
      events,
      opportunities,
    } = req.body;

    // Validate user input
    if (
      !(
        first_name &&
        last_name &&
        father_name &&
        title &&
        role &&
        date_of_birth &&
        gender &&
        phone &&
        nationality &&
        residence &&
        student_id &&
        special_needs !== undefined &&
        active_email &&
        password &&
        faculty &&
        branch &&
        privacy_consent !== undefined &&
        privacy_policy_agreement !== undefined
      )
    ) {
      return res.status(400).send("Please fill in the required inputs");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ active_email });
    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      first_name,
      last_name,
      father_name,
      title,
      role,
      date_of_birth,
      gender,
      phone,
      nationality,
      residence,
      student_id,
      special_needs,
      lu_email,
      active_email,
      password: hashedPassword,
      faculty,
      branch,
      privacy_consent,
      privacy_policy_agreement,
      verified,
      events,
      opportunities,
    });
    await user.save();

    // Create token
    const token = jwt.sign(
      { user_id: user._id, active_email },
      process.env.USER_TOKEN_KEY,
      { expiresIn: "5h" }
    );

    // Return the new user and token
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};
