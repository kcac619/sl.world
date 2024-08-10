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

async function callStoredProcedure(procedureName, params = {}) {
  try {
    const pool = await dbClientService();
    const request = pool.request();

    // Add parameters if provided
    if (Object.keys(params).length > 0) {
      for (const paramName in params) {
        request.input(paramName, params[paramName]);
      }
    }

    // Add output parameters
    request.output("StatusID", sql.Int);
    request.output("StatusMessage", sql.VarChar(200));
    request.output("TotalCount", sql.Int);

    const result = await request.execute(procedureName);

    return {
      status: result.output.StatusID,
      message: result.output.StatusMessage,
      total: result.output.TotalCount,
      data: result.recordset,
    };
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

export { dbClientService, callStoredProcedure };
