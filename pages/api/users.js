// pages/api/users.js
import { callStoredProcedure } from "./db";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password, role } = req.body;
      const result = await callStoredProcedure("sp_CreateUser", {
        Email: email,
        PasswordHash: password, // Password is already hashed in the frontend
        Role: role,
      });

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
