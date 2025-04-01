// Server code updated by Madhusudhan Rao on April 1st 2025
import express from "express";
import oracledb from "oracledb";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  let connection;
  try {
    //Server Connection
    //Ensure that wallet zip file is extracted in /myfolderpath/mywebsite/wallet folder, where .ora .sso and other files are available
    connection = await oracledb.getConnection({
      user: "<DB-UserName>",
      password: "<DB-Password>",
      connectString:
        "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.us-phoenix-1.oraclecloud.com))(connect_data=(service_name=doesitmater?_dbname_medium.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))",
      walletLocation: "/myfolderpath/mywebsite/wallet",
      walletPassword: "welcome1",
    });
 
    const sql2 =
      "INSERT INTO APPUSERS (EMAIL, PASSWORD, SECURITY_QUESTION, SECURITY_ANSWER) VALUES (:email, :password, :securityQuestion, :securityAnswer)";

    const binds = {
      email: req.body.email,
      password: req.body.password,
      securityQuestion: req.body.securityQuestion,
      securityAnswer: req.body.securityAnswer,
    };

    const result = await connection.execute(sql2, binds);
    res.json({
      message: "Data inserted successfully",
      rowsAffected: result.rowsAffected,
    });
    console.log("Rows inserted:", result.rowsAffected);
    await connection.commit();

    // await connection.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to insert data" });
  } finally {
    await connection.close();
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
