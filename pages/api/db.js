// lib/db.js
import sql from "mssql";

const config = {
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD, // *** VERY IMPORTANT *** Change this password immediately
  server: process.env.SQL_HOST,
  database: process.env.SQL_DBNAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const dbClientService = async () => {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

async function callStoredProcedure(
  procedureName,
  params = {},
  outputParams = []
) {
  try {
    const pool = await dbClientService();
    const request = pool.request();

    // Add input parameters
    for (const paramName in params) {
      request.input(paramName, params[paramName]);
    }

    if (outputParams.length === 0) {
      // Execute the stored procedure without output parameters
      outputParams = ["StatusID", "StatusMessage", "TotalCount"];
    }

    // Add output parameters with specific types
    for (const outputParam of outputParams) {
      if (outputParam === "StatusID") {
        request.output(outputParam, sql.Int);
      } else if (outputParam === "StatusMessage") {
        request.output(outputParam, sql.VarChar(200));
      } else if (outputParam === "TotalCount") {
        request.output(outputParam, sql.Int);
      } else if (outputParam === "OrderID") {
        request.output(outputParam, sql.Int);
      } else {
        // Default to sql.NVarChar if type is not specified
        request.output(outputParam, sql.NVarChar);
      }
    }

    const result = await request.execute(procedureName);
    // console.log(`Result: of ${procedureName}`, result);
    // Create output object
    const output = {};
    for (const outputParam of outputParams) {
      output[outputParam] = result.output[outputParam];
    }
    // console.log(`Output: of ${procedureName}`, output);
    // Access output parameters based on whether they were provided
    return {
      status: outputParams.includes("StatusID") ? output.StatusID : undefined,
      message: outputParams.includes("StatusMessage")
        ? output.StatusMessage
        : undefined,
      total: outputParams.includes("TotalCount")
        ? output.TotalCount
        : undefined,
      OrderID: outputParams.includes("OrderID") ? output.OrderID : undefined,
      data: result.recordset,
      ...output,
    };
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    throw error;
  }
}

export { dbClientService, callStoredProcedure };
