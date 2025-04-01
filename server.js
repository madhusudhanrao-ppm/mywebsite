import express from 'express';
import oracledb from 'oracledb';
import { dbConfig } from './config.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Oracle connection pool
async function initialize() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool created successfully');
    } catch (err) {
        console.error('Error creating connection pool:', err);
        throw err;
    }
}

// Register new user
app.post('/api/register', async (req, res) => {
    let connection;
    try {
        const { email, password, securityQuestion, securityAnswer } = req.body;

        connection = await oracledb.getConnection();
        
        // Insert user data into APPUSERS table
        const result = await connection.execute(
            `INSERT INTO APPUSERS (EMAIL, PASSWORD, SECURITY_QUESTION, SECURITY_ANSWER) 
             VALUES (:email, :password, :securityQuestion, :securityAnswer)`,
            {
                email,
                password, // Note: In production, password should be hashed
                securityQuestion,
                securityAnswer
            },
            { autoCommit: true }
        );

        res.json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        console.error('Error in registration:', err);
        res.status(500).json({ 
            success: false, 
            message: err.message || 'Error during registration' 
        });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
});

// Serve static files
app.use(express.static('.'));

// Start server
const PORT = process.env.PORT || 3000;
initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});