import { callStoredProcedure } from "./db";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const result = await callStoredProcedure("sp_GetActiveBlogs");

      if (result.status === 1) {
        res.status(200).json({
          blogs: result.data,
          totalCount: result.total,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching blogs." });
    }
  } else {
    res.status(405).end();
  }
};
