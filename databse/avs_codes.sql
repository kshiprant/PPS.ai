-- ----------------------------
-- Table: avs_codes
-- ----------------------------
CREATE TABLE IF NOT EXISTS avs_codes (
    code CHAR(1),
    network VARCHAR(20),
    meaning TEXT,
    action TEXT,
    PRIMARY KEY (code, network)
);

-- ----------------------------
-- Insert AVS Codes
-- ----------------------------
INSERT INTO avs_codes (code, network, meaning, action) VALUES
('A', 'Visa', 'Street matches, ZIP does not', 'Partial match — review transaction'),
('A', 'Mastercard', 'Street address matches, postal code does not', 'Consider manual review'),
('A', 'AmEx', 'Street matches, ZIP mismatch', 'Review for potential risk'),
('A', 'Discover', 'Street matches, postal code mismatch', 'Partial match — caution'),
('A', 'JCB', 'Street matches, ZIP does not match', 'Manual verification recommended'),

('N', 'Visa', 'No match at all', 'High risk — likely fraud'),
('N', 'Mastercard', 'Address and postal code do not match', 'Escalate for review'),
('N', 'AmEx', 'Street and ZIP do not match', 'High alert — investigate'),
('N', 'Discover', 'No match found', 'Potential fraud — review immediately'),
('N', 'JCB', 'No match', 'Manual verification required'),

('Z', 'Visa', 'ZIP matches, street address does not', 'Partial match — review transaction'),
('Z', 'Mastercard', 'Postal code matches, street does not', 'Consider manual review'),
('Z', 'AmEx', 'Street address mismatch, postal code matches', 'Possible fraud — escalate if high value'),
('Z', 'Discover', 'Postal code matches, street address mismatch', 'Review transaction details'),
('Z', 'JCB', 'ZIP matches, street mismatch', 'Manual verification recommended'),

('X', 'Visa', 'Full match', 'Low risk — safe to proceed'),
('X', 'Mastercard', 'Street and postal code match', 'Transaction is low risk'),
('X', 'AmEx', 'Full address match', 'Low risk'),
('X', 'Discover', 'Street and ZIP match', 'Proceed normally'),
('X', 'JCB', 'Full match', 'Low risk'),

('W', 'Visa', 'ZIP matches, street does not', 'Partial match — review'),
('W', 'Mastercard', 'Postal code matches, street does not', 'Consider manual review'),
('W', 'AmEx', 'Street mismatch, postal code matches', 'Possible fraud — review'),
('W', 'Discover', 'ZIP matches, street mismatch', 'Manual review recommended'),
('W', 'JCB', 'Postal code matches, street mismatch', 'Manual verification');
