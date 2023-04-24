import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_super_admin: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
});

const Admin = model("Admin", AdminSchema);
export default Admin;
