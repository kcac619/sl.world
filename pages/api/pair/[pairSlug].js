import { callStoredProcedure } from "../db";
import { getObjectSignedUrl } from "../s3";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const pairSlug = req.query.pairSlug;

      const result = await callStoredProcedure("sp_GetPairBySlug", {
        PairSlug: pairSlug,
      });
      //   console.log("pair from route", resul t);
      if (result.status === 1 && result.total > 0) {
        // Extract pair details (first result set)
        const pair = result.data[0];

        // Extract solitaire details (second result set)
        const solitaires = result.recordsets[1];

        // Generate signed URLs for each solitaire's images
        const solitairesWithSignedUrls = await Promise.all(
          solitaires.map(async (solitaire) => {
            const imageKeys = [
              "Image1",
              "Image2",
              "Image3",
              "Image4",
              "Image5",
            ];
            const signedUrls = {};

            for (const key of imageKeys) {
              if (solitaire[key]) {
                try {
                  signedUrls[key] = await getObjectSignedUrl(solitaire[key]);
                } catch (error) {
                  console.error(
                    `Error generating signed URL for ${key}:`,
                    error
                  );
                }
              }
            }

            // Generate signed URLs for PDF and Video
            if (solitaire.PDFKey) {
              try {
                signedUrls.pdfUrl = await getObjectSignedUrl(solitaire.PDFKey);
              } catch (error) {
                console.error("Error generating signed URL for PDF:", error);
              }
            }

            if (solitaire.VideoKey) {
              try {
                signedUrls.videoUrl = await getObjectSignedUrl(
                  solitaire.VideoKey
                );
              } catch (error) {
                console.error("Error generating signed URL for video:", error);
              }
            }

            return { ...solitaire, ...signedUrls };
          })
        );

        // Combine pair details and solitaires with signed URLs
        const pairData = { ...pair, solitaires: solitairesWithSignedUrls };

        res.status(200).json({ pair: pairData });
      } else if (result.status === 1 && result.total === 0) {
        res.status(404).json({ error: "Pair not found." });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error fetching pair details:", error);
      res.status(500).json({ error: "Error fetching pair details." });
    }
  } else {
    res.status(405).end();
  }
};
