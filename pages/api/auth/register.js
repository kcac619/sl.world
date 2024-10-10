import { callStoredProcedure } from "../db";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password, firstName, lastName } = req.body;
      console.log("req.body -> ", req.body);
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await callStoredProcedure(
        "sp_CreateUser",
        {
          Email: email,
          PasswordHash: hashedPassword,
          FirstName: firstName,
          LastName: lastName,
        },
        ["StatusID", "StatusMessage"]
      ); // Removed UserID output parameter

      if (result.status === 1) {
        res.status(201).json({ message: "User created successfully." }); // No userId returned
      } else {
        res.status(400).json({ error: result.message });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user." });
    }
  } else {
    res.status(405).end();
  }
};
