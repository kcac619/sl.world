import { callStoredProcedure } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const result = await callStoredProcedure(
        "sp_GetUserByEmail",
        {
          Email: email,
        },
        ["StatusID", "StatusMessage"]
      );

      if (result.status !== 1 || !result.data || result.data.length === 0) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      const user = result.data[0];

      // Compare the submitted password with the hashed password in the database
      const isValidPassword = await bcrypt.compare(password, user.PasswordHash);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Create JWT token (set expiration as needed)
      const token = jwt.sign(
        {
          userId: user.UserID,
          email: user.Email,
          firstName: user.FirstName,
          lastName: user.LastName,
        },
        process.env.JWT_SECRET, // Your JWT secret
        { expiresIn: "1h" } // 1 hour expiration
      );

      // Set the token as a cookie
      //   res.setHeader(
      //     "Set-Cookie",
      //     `token=${token}; HttpOnly; Secure; Path=/; Domain=localhost; SameSite=Lax`
      //   );

      res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Failed to log in." });
    }
  } else {
    res.status(405).end();
  }
};
