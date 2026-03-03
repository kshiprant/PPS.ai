-- ----------------------------
-- Table: eci_values
-- ----------------------------
CREATE TABLE IF NOT EXISTS eci_values (
    code VARCHAR(2),
    network VARCHAR(20),
    meaning TEXT,
    risk TEXT,
    PRIMARY KEY (code, network)
);

-- ----------------------------
-- Insert ECI Values
-- ----------------------------
INSERT INTO eci_values (code, network, meaning, risk) VALUES
('00', 'Visa', '3DS authentication failed or not attempted', 'No liability shift'),
('00', 'Mastercard', '3DS authentication failed or not attempted', 'No liability shift'),
('00', 'AmEx', 'Authentication not done', 'No liability shift'),

('01', 'Visa', '3DS authentication attempted', 'May shift liability'),
('01', 'Mastercard', '3DS attempted', 'May shift liability'),
('01', 'AmEx', '3DS attempted', 'May shift liability'),

('02', 'Visa', '3DS authentication successful', 'Liability shifts to issuer'),
('02', 'Mastercard', '3DS authentication successful', 'Liability shifts to issuer'),
('02', 'AmEx', '3DS authentication successful', 'Liability shifts to issuer'),

('05', 'Visa', '3DS authentication successful', 'Liability shift applies'),
('05', 'Mastercard', '3DS authentication successful', 'Liability shift applies'),
('05', 'AmEx', '3DS authentication successful', 'Liability shift applies'),

('06', 'Visa', 'Authentication attempted / stand-in', 'May have liability shift'),
('06', 'Mastercard', 'SCA exempt / out of scope', 'No liability shift'),
('06', 'AmEx', 'Authentication attempted / exempt', 'May shift liability'),

('07', 'Visa', 'Authentication failed or could not be attempted', 'No liability shift'),
('07', 'Mastercard', 'Recurring / other authenticated transaction', 'Liability for recurring'),
('07', 'AmEx', 'Authentication failed', 'No liability shift');
