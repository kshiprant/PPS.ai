// References
const chatPanel = document.getElementById("chat-panel");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const menuIcon = document.getElementById("menu-icon");
const settingsDropdown = document.getElementById("settings-dropdown");
const themeLightBtn = document.getElementById("theme-light");
const themeDarkBtn = document.getElementById("theme-dark");
const viewMobileBtn = document.getElementById("view-mobile");
const viewDesktopBtn = document.getElementById("view-desktop");
const chatColorInput = document.getElementById("chat-color");
const container = document.getElementById("container");

// Toggle settings menu
menuIcon.addEventListener("click", () => {
  settingsDropdown.style.display = settingsDropdown.style.display === "block" ? "none" : "block";
});

// Theme toggle
themeLightBtn.addEventListener("click", () => container.className = "light");
themeDarkBtn.addEventListener("click", () => container.className = "dark");

// View mode toggle
viewMobileBtn.addEventListener("click", () => chatPanel.classList.remove("desktop"));
viewDesktopBtn.addEventListener("click", () => chatPanel.classList.add("desktop"));

// Chat color change
chatColorInput.addEventListener("input", (e) => {
  document.querySelectorAll(".bubble.user").forEach(b => b.style.backgroundColor = e.target.value);
});

// Send message
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => e.key === "Enter" && sendMessage());

// --------- DATABASES ---------
const fraudPatterns = [
  { name: "BOOKED.NET", countries: ["Australia","Germany","Spain","Singapore"], emailPattern: /.+\..+@.+\..+/, hotels: "link search bad", cards: ["Visa","MasterCard"] },
  { name: "TRAVELATED-ONLINE", countries: ["Mexico","Singapore","Indonesia"], hotels: ["Mexico","Singapore","Indonesia","Turkey"], billingMismatch: true, cards: ["Visa","MasterCard"] },
  { name: "REZ-ONLINE", billingCountries: ["Mexico","USA","Malaysia"], hotelCountries: ["Mexico","Malaysia","Indonesia"], billingInvalid: true },
  { name: "USA-ADDRESS-MISMATCH", hotel: "California", cardholderDifferent: true, billingStateDiff: true, addressSingleUnit: true }
];

const eciValues = {
  "05": "3DS authenticated – liability shift applies",
  "06": "Authentication attempted / merchant attempted",
  "07": "3DS not authenticated",
  "01": "Mastercard – 3DS authenticated via identity check",
  "02": "Mastercard – Full 3DS authentication"
};

const avsResponses = {
  "A": { Visa: "Address matches; ZIP does not", MasterCard: "Address matches; ZIP does not" },
  "B": { Visa: "Street matches; postal not verified", MasterCard: "Street matches; postal not verified" },
  "C": { Visa: "Street & postal match (Intl)", MasterCard: "Street & postal match (Intl)" },
  "D": { Visa: "Street & postal match (Intl)", MasterCard: "Street & postal match (Intl)" },
  "G": { Visa: "Not verified (Intl)", MasterCard: "Not verified (Intl)" },
  "I": { Visa: "Address info not verified", MasterCard: "Address info not verified" },
  "N": { Visa: "No match", MasterCard: "No match" },
  "P": { Visa: "Postal match only", MasterCard: "Postal match only" },
  "R": { Visa: "Retry – system unavailable", MasterCard: "Retry – system unavailable" },
  "S": { Visa: "Service not supported", MasterCard: "Service not supported" },
  "U": { Visa: "Data unavailable", MasterCard: "Data unavailable" },
  "W": { Visa: "ZIP matches; street does not", MasterCard: "ZIP matches; street does not" },
  "X": { Visa: "Full match (street & 9-digit ZIP)", MasterCard: "Full match (street & 9-digit ZIP)" },
  "Y": { Visa: "Street & 5-digit ZIP match", MasterCard: "Street & 5-digit ZIP match" },
  "Z": { Visa: "ZIP matches; street does not", MasterCard: "ZIP matches; street does not" }
};

const chargebackCodes = {
  "10.4": "Visa – Other Fraud (Card Absent)",
  "11.3": "Visa – No Authorization",
  "12.5": "Visa – Incorrect Amount",
  "13.1": "Visa – Merchandise/Services Not Received",
  "4837": "Mastercard – No Cardholder Authorization",
  "4834": "Mastercard – Point-of-Interaction Error",
  "4853": "Mastercard – Cardholder Dispute",
  "4860": "Mastercard – Credit Not Processed"
};

// --------- FUNCTIONS ---------
function addBubble(sender, text) {
  const bubbleContainer = document.createElement("div");
  bubbleContainer.className = "bubble-container " + (sender === "user" ? "user" : "bot");

  const bubble = document.createElement("div");
  bubble.className = "bubble " + (sender === "user" ? "user" : "bot");
  bubble.textContent = text;

  if(sender === "user") bubble.style.backgroundColor = chatColorInput.value;

  bubbleContainer.appendChild(bubble);
  chatPanel.appendChild(bubbleContainer);
  chatPanel.scrollTop = chatPanel.scrollHeight;
}

function sendMessage() {
  const text = chatInput.value.trim();
  if(!text) return;
  addBubble("user", text);
  chatInput.value = "";

  let response = "";

  // Check Fraud Patterns
  const fp = fraudPatterns.find(f => text.toLowerCase().includes(f.name.toLowerCase()));
  if(fp) response += `Fraud Pattern Found: ${JSON.stringify(fp,null,2)}\n`;

  // Check ECI
  if(eciValues[text]) response += `ECI Value ${text}: ${eciValues[text]}\n`;

  // Check AVS
  if(avsResponses[text]) {
    const avs = avsResponses[text];
    response += `AVS Response ${text}: Visa: ${avs.Visa}, MasterCard: ${avs.MasterCard}\n`;
  }

  // Check Chargeback
  if(chargebackCodes[text]) response += `Chargeback Code ${text}: ${chargebackCodes[text]}\n`;

  if(response === "") response = "No matching data found.";
  addBubble("bot", response);
    }
