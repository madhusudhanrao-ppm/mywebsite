-- Create APPUSERS table
CREATE TABLE APPUSERS (
    EMAIL VARCHAR2(255) PRIMARY KEY,
    PASSWORD VARCHAR2(255) NOT NULL,
    SECURITY_QUESTION VARCHAR2(255) NOT NULL,
    SECURITY_ANSWER VARCHAR2(255) NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_appusers_email ON APPUSERS(EMAIL);

-- Add comments for documentation
COMMENT ON TABLE APPUSERS IS 'Table storing user registration information';
COMMENT ON COLUMN APPUSERS.EMAIL IS 'User email address (Primary Key)';
COMMENT ON COLUMN APPUSERS.PASSWORD IS 'User password (should be hashed in production)';
COMMENT ON COLUMN APPUSERS.SECURITY_QUESTION IS 'Security question for password recovery';
COMMENT ON COLUMN APPUSERS.SECURITY_ANSWER IS 'Answer to security question';
COMMENT ON COLUMN APPUSERS.CREATED_AT IS 'Timestamp when the user account was created';