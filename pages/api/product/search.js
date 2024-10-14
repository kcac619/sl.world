import { callStoredProcedure } from "../db";
import { getObjectSignedUrl } from "../s3";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { searchTerm, pageNumber, pageSize } = req.body;

      const result = await callStoredProcedure("sp_SearchProducts", {
        SearchTerm: searchTerm,
        PageNumber: pageNumber,
        PageSize: pageSize,
      });

      if (result.status === 1) {
        const productsWithUrls = await Promise.all(
          result.data.map(async (product) => {
            const imageFields = [
              "FeatureImage",
              "Image1",
              "Image2",
              "Image3",
              "Image4",
              "Image5",
            ];
            const signedUrls = {};

            for (const field of imageFields) {
              if (product[field]) {
                signedUrls[field] = await getObjectSignedUrl(product[field]);
              }
            }

            return { ...product, ...signedUrls };
          })
        );

        res.status(200).json({
          products: productsWithUrls,
          totalCount: result.total,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error searching for products:", error);
      res.status(500).json({ error: "Error searching for products." });
    }
  } else {
    res.status(405).end();
  }
};
