-- ----------------------------
-- Table: fraud_patterns
-- ----------------------------
CREATE TABLE IF NOT EXISTS fraud_patterns (
    id SERIAL PRIMARY KEY,
    pattern_name VARCHAR(100) NOT NULL,
    keywords TEXT NOT NULL,
    description TEXT,
    risk_level VARCHAR(10),
    suggested_action TEXT,
    active BOOLEAN DEFAULT TRUE
);

-- ----------------------------
-- Insert Fraud Patterns
-- ----------------------------
INSERT INTO fraud_patterns (pattern_name, keywords, description, risk_level, suggested_action, active) VALUES
-- 1. BOOKED.NET
('BOOKED.NET Suspicious Booking',
 'BOOKED.NET, Australia, Germany, Spain, Singapore, email with dots, hotel link search bad, link search bad',
 'Transactions coming from BOOKED.NET bookings in Australia, Germany, Spain, or Singapore. Email addresses contain multiple dots (e.g., adit.ya.menon@gmail.com). Hotel or link search appears suspicious or invalid. Both Visa and MasterCard used.',
 'HIGH',
 'Flag transaction for manual review; verify hotel link and customer email before approval.',
 TRUE),

-- 2. TRAVELATED-ONLINE
('TRAVELATED-ONLINE Suspicious Booking',
 'TRAVELATED-ONLINE, Mexico, Singapore, Indonesia, Turkey, billing mismatch, invalid billing, hotel link bad',
 'Transactions from TRAVELATED-ONLINE bookings in Mexico, Singapore, Indonesia, or Turkey. Billing country may differ from card country or appear invalid. Hotel links appear suspicious or invalid. Both Visa and MasterCard used.',
 'HIGH',
 'Flag transaction for manual review; verify billing details and hotel link before approval.',
 TRUE),

-- 3. REZ-ONLINE
('REZ-ONLINE Suspicious Booking',
 'REZ-ONLINE, Mexico, USA, Malaysia, Indonesia, billing invalid, hotel link bad',
 'Transactions from REZ-ONLINE bookings where the billing is from Mexico, USA, or Malaysia, and the hotel is in Mexico, Malaysia, or Indonesia. Billing details appear invalid, and hotel links are suspicious or broken.',
 'HIGH',
 'Flag transaction for manual review; verify billing details and hotel link before approval.',
 TRUE),

-- 4. USA Guest-Cardholder Mismatch
('USA Guest-Cardholder Mismatch',
 'USA, cardholder different, guest different, billing address different state, phone area different state, single unit address, California hotel',
 'Transactions where the cardholder and the guest are different. Billing address and phone area are from different states. Address is a single unit, and the cardholder and guest are not linked. Hotel is located in California.',
 'HIGH',
 'Flag transaction for manual review; verify cardholder, guest, and billing details before approval.',
 TRUE);
