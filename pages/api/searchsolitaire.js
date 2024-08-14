import { callStoredProcedure } from "./db"; // Import from db.js
import { getObjectSignedUrl } from "./s3";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const result = await callStoredProcedure("sp_AdminGetSolitaires", {}, [
        "StatusID",
        "StatusMessage",
        "TotalCount",
        "SolitaireID",
        "ShapeName",
        "Carat",
        "ColorName",
        "FluorName",
        "PurityName",
        "CutName",
        "LabName",
        "PolishName",
        "SymmName",
        "LocationName",
        "CerificateNumber",
        "UniqueCode",
        "Image1",
        "Image2",
        "Image3",
        "Image4",
        "Image5",
        "PDFKey",
        "VideoKey",
        "IsActive",
      ]);

      if (result.status === 1) {
        const solitairesWithUrls = await Promise.all(
          result.data.map(async (solitaire) => {
            const imageKeys = [
              "Image1",
              "Image2",
              "Image3",
              "Image4",
              "Image5",
            ];
            const imageUrls = await Promise.all(
              imageKeys.map(async (key) => {
                let imageUrl = null;
                if (solitaire[key]) {
                  try {
                    imageUrl = await getObjectSignedUrl(solitaire[key]);
                    console.log(
                      `Signed URL for solitaire ${solitaire.SolitaireID} (${key}):`,
                      imageUrl
                    );
                  } catch (error) {
                    console.error(
                      `Error generating signed URL for solitaire ${solitaire.SolitaireID} (${key}):`,
                      error
                    );
                  }
                } else {
                  console.log(
                    `No image found for solitaire ${solitaire.SolitaireID} (${key})`
                  );
                }
                return imageUrl;
              })
            );

            let pdfUrl = null;
            if (solitaire.PDFKey) {
              try {
                pdfUrl = await getObjectSignedUrl(solitaire.PDFKey);
                console.log(
                  `Signed PDF URL for solitaire ${solitaire.SolitaireID}:`,
                  pdfUrl
                );
              } catch (error) {
                console.error(
                  `Error generating signed PDF URL for solitaire ${solitaire.SolitaireID}:`,
                  error
                );
              }
            } else {
              console.log(
                `No PDF found for solitaire ${solitaire.SolitaireID}`
              );
            }

            let videoUrl = null;
            if (solitaire.VideoKey) {
              try {
                videoUrl = await getObjectSignedUrl(solitaire.VideoKey);
                console.log(
                  `Signed Video URL for solitaire ${solitaire.SolitaireID}:`,
                  videoUrl
                );
              } catch (error) {
                console.error(
                  `Error generating signed Video URL for solitaire ${solitaire.SolitaireID}:`,
                  error
                );
              }
            } else {
              console.log(
                `No Video found for solitaire ${solitaire.SolitaireID}`
              );
            }

            return {
              ...solitaire,
              Image1: imageUrls[0],
              Image2: imageUrls[1],
              Image3: imageUrls[2],
              Image4: imageUrls[3],
              Image5: imageUrls[4],
              pdfUrl: pdfUrl,
              videoUrl: videoUrl,
            };
          })
        );

        res.json({
          statusid: result.status,
          statusmessage: result.message,
          totalcount: result.total,
          solitaires: solitairesWithUrls,
        });
      } else {
        throw new Error(result.statusmessage);
      }
    } catch (error) {
      console.error("Error fetching solitaires:", error);
      res
        .status(500)
        .json({ statusid: 0, statusmessage: "Error fetching solitaires" });
    }
  }
};
