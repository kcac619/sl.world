import { callStoredProcedure } from "./db"; // Import from db.js
import { getObjectSignedUrl } from "./s3";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await callStoredProcedure("sp_AdminGetAllFilters", {}, [
        "StatusID",
        "StatusMessage",
        "TotalCount",
      ]); // Include TotalCount output parameter
      // console.log("Result from sp_AdminGetAllFilters:", result);
      if (result.status === 1) {
        const filterData = result.data[0]; // Extract data from the first row

        // Parse the JSON strings into JavaScript arrays
        const shapes = JSON.parse(filterData.Shapes);
        const carats = JSON.parse(filterData.Carats);
        const colors = JSON.parse(filterData.Colors);
        const flours = JSON.parse(filterData.Flours);
        const purities = JSON.parse(filterData.Purities);
        const cuts = JSON.parse(filterData.Cuts);
        const labs = JSON.parse(filterData.Labs);
        const polishs = JSON.parse(filterData.Polishs);
        const symmetries = JSON.parse(filterData.Symmetries);
        const locations = JSON.parse(filterData.Locations);

        // Generate signed URLs for shapes
       
        res.status(200).json({
          shapes: shapes,
          carats: carats, // Use the parsed arrays
          colors: colors,
          flours: flours,
          purities: purities,
          cuts: cuts,
          labs: labs,
          polishs: polishs,
          symmetries: symmetries,
          locations: locations,
          totalCount: result.totalcount,
        });
      } else {
        res.status(400).json({ error: "Error fetching filter data." });
      }
    } catch (error) {
      console.error("Error fetching all filter data:", error);
      res.status(500).json({ error: "Error fetching filter data." });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
