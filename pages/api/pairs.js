// pages/api/pairs.js
import { callStoredProcedure } from "./db";
import { getObjectSignedUrl } from "./s3";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const result = await callStoredProcedure(
        "sp_GetPairsWithFirstTwoSolitaires"
      );

      if (result.status === 1) {
        const uniquePairs = {}; // To store unique pairs

        result.data.forEach((pair) => {
          if (!uniquePairs[pair.PairID]) {
            uniquePairs[pair.PairID] = pair; // Store the first occurrence of the PairID
          }
        });

        // Convert uniquePairs object to an array
        const uniquePairsArray = Object.values(uniquePairs);

        const pairsWithSignedUrls = await Promise.all(
          uniquePairsArray.map(async (pair) => {
            const imageFields = ["Solitaire1Image1", "Solitaire2Image1"];
            const signedUrls = {};

            for (const field of imageFields) {
              if (pair[field]) {
                signedUrls[field] = await getObjectSignedUrl(pair[field]);
              }
            }

            return { ...pair, ...signedUrls };
          })
        );

        res.status(200).json({
          pairs: pairsWithSignedUrls,
          totalCount: uniquePairsArray.length, // Send the count of unique pairs
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error fetching pairs data:", error);
      res.status(500).json({ error: "Error fetching pairs data" });
    }
  } else {
    res.status(405).end();
  }
};
