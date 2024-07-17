// pages/api/shapes.js
import { callStoredProcedure } from "./db"; // Import from db.js

export default async (req, res) => {
  try {
    const result = await callStoredProcedure("sp_GetShapes");

    if (result.status === 1) {
      res.status(200).json({
        shapes: result.data,
        totalCount: result.total,
      });
      // console.log("Shapes fetched successfully");
      // console.log("Shapes:", result.data);
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching shapes" });
  }
};
