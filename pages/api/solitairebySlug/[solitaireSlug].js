import { callStoredProcedure } from "../db";
import { getObjectSignedUrl } from "../s3";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const solitaireSlug = req.query.solitaireSlug; // Get slug from the URL

      const result = await callStoredProcedure("sp_GetSolitaireBySlug", {
        SolitaireSlug: solitaireSlug, // Use SolitaireSlug parameter
      });

      if (result.status === 1 && result.data.length > 0) {
        const solitaire = result.data[0];
        console.log("solitaire from route", solitaire);

        // Generate signed URLs for images, PDF, and video
        const signedUrls = await generateSignedUrls(solitaire);

        res.status(200).json({
          solitaire: { ...solitaire, ...signedUrls },
        });
      } else if (result.status === 1 && result.data.length === 0) {
        res.status(404).json({ error: "Solitaire not found." });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error fetching solitaire details:", error);
      res.status(500).json({ error: "Error fetching solitaire details." });
    }
  } else {
    res.status(405).end();
  }
};
// Helper function to generate signed URLs
const generateSignedUrls = async (solitaire) => {
  const imageKeys = ["Image1", "Image2", "Image3", "Image4", "Image5"];
  const signedUrls = {};

  for (const key of imageKeys) {
    if (solitaire[key]) {
      try {
        signedUrls[key] = await getObjectSignedUrl(solitaire[key]);
      } catch (error) {
        console.error(`Error generating signed URL for ${key}:`, error);
        // Handle error (e.g., set a default image URL)
      }
    }
  }

  // Generate signed URL for PDF
  if (solitaire.PDFKey) {
    try {
      signedUrls.pdfUrl = await getObjectSignedUrl(solitaire.PDFKey);
    } catch (error) {
      console.error("Error generating signed URL for PDF:", error);
    }
  }

  // Generate signed URL for video
  if (solitaire.VideoKey) {
    try {
      signedUrls.videoUrl = await getObjectSignedUrl(solitaire.VideoKey);
    } catch (error) {
      console.error("Error generating signed URL for video:", error);
    }
  }

  return signedUrls;
};
