-- ----------------------------
-- Table: chargeback_codes
-- ----------------------------
CREATE TABLE IF NOT EXISTS chargeback_codes (
    code VARCHAR(10),
    network VARCHAR(20),
    meaning TEXT,
    action TEXT,
    PRIMARY KEY (code, network)
);

-- ----------------------------
-- Insert Chargeback Codes
-- ----------------------------
INSERT INTO chargeback_codes (code, network, meaning, action) VALUES
('4853', 'Visa', 'Unauthorized transaction claimed by cardholder', 'Investigate & respond to dispute'),
('4853', 'Mastercard', 'Cardholder disputes transaction', 'Gather evidence and respond'),
('4853', 'AmEx', 'Fraudulent transaction reported', 'File rebuttal or investigation'),

('4860', 'Visa', 'Goods or services not received', 'Check merchant fulfillment & respond'),
('4860', 'Mastercard', 'Product not delivered', 'Provide proof of delivery'),
('4860', 'AmEx', 'Services/goods not received', 'Investigate & respond'),

('4870', 'Visa', 'Duplicate processing', 'Refund or clarify transaction'),
('4870', 'Mastercard', 'Duplicate transaction reported', 'Provide evidence & resolve'),
('4870', 'AmEx', 'Duplicate billing', 'Investigate and correct');
