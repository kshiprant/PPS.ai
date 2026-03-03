// References
const chatPanel = document.getElementById("chat-panel");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const menuIcon = document.getElementById("menu-icon");
const settingsDropdown = document.getElementById("settings-dropdown");
const themeLightBtn = document.getElementById("theme-light");
const themeDarkBtn = document.getElementById("theme-dark");
const chatColorInput = document.getElementById("chat-color");
const container = document.getElementById("container");
const drawer = document.getElementById("prompts-drawer");
const drawerToggle = document.getElementById("drawer-toggle");

// Toggle settings menu
menuIcon.addEventListener("click", () => {
  settingsDropdown.style.display = settingsDropdown.style.display === "block" ? "none" : "block";
});

// Theme toggle
themeLightBtn.addEventListener("click", () => container.className = "light");
themeDarkBtn.addEventListener("click", () => container.className = "dark");

// Chat color change
chatColorInput.addEventListener("input", (e) => {
  document.querySelectorAll(".bubble.user").forEach(b => b.style.backgroundColor = e.target.value);
});

// Drawer toggle
drawerToggle.addEventListener("click", () => {
  drawer.classList.toggle("closed");
  drawer.classList.toggle("open");
});

// Send message
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => e.key === "Enter" && sendMessage());

// DATABASES
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

// FUNCTIONS
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

// Smarter search function
function getFraudMatches(input) {
  const lowerInput = input.toLowerCase();
  return fraudPatterns.filter(f => {
    if(f.name.toLowerCase().includes(lowerInput)) return true;
    if(f.countries && f.countries.some(c => lowerInput.includes(c.toLowerCase()))) return true;
    if(f.billingCountries && f.billingCountries.some(c => lowerInput.includes(c.toLowerCase()))) return true;
    if(f.hotelCountries && f.hotelCountries.some(c => lowerInput.includes(c.toLowerCase()))) return true;
    if(f.hotels) {
      const hotelsArr = Array.isArray(f.hotels) ? f.hotels : [f.hotels];
      if(hotelsArr.some(h => lowerInput.includes(h.toLowerCase()))) return true;
    }
    if(f.cards && f.cards.some(c => lowerInput.includes(c.toLowerCase()))) return true;
    if(f.emailPattern && f.emailPattern.test(input)) return true;
    return false;
  });
}

// Main send message function
function sendMessage() {
  const text = chatInput.value.trim();
  if(!text) return;
  addBubble("user", text);
  chatInput.value = "";

  let response = "";
  const lowerText = text.toLowerCase();
  const upperText = text.toUpperCase();

  // FRAUD PATTERNS (bullet points)
  const matches = getFraudMatches(lowerText);
  if(matches.length > 0) {
    matches.forEach(f => {
      let formatted = `Fraud Pattern: ${f.name}\n`;
      if(f.countries) formatted += `• Countries: ${f.countries.join(", ")}\n`;
      if(f.billingCountries) formatted += `• Billing Countries: ${f.billingCountries.join(", ")}\n`;
      if(f.hotelCountries) formatted += `• Hotel Countries: ${f.hotelCountries.join(", ")}\n`;
      if(f.hotels) {
        const hotelsArr = Array.isArray(f.hotels) ? f.hotels : [f.hotels];
        formatted += `• Hotel Info: ${hotelsArr.join(", ")}\n`;
      }
      if(f.cards) formatted += `• Cards Used: ${f.cards.join(", ")}\n`;
      if(f.emailPattern) formatted += `• Email Pattern: Yes\n`;
      if(f.billingInvalid) formatted += `• Billing Details Invalid: Yes\n`;
      if(f.billingMismatch) formatted += `• Billing Mismatch: Yes\n`;
      if(f.cardholderDifferent) formatted += `• Cardholder differs from guest: Yes\n`;
      if(f.billingStateDiff) formatted += `• Billing state different from hotel state: Yes\n`;
      if(f.addressSingleUnit) formatted += `• Address is single unit: Yes\n`;
      response += formatted + "\n";
    });
  }

  // ECI direct code
  if(eciValues[text]) response += `ECI Value ${text}: ${eciValues[text]}\n`;

  // AVS code
  if(avsResponses[upperText]) {
    const avs = avsResponses[upperText];
    response += `AVS Response ${upperText}: Visa: ${avs.Visa}, MasterCard: ${avs.MasterCard}\n`;
  } else if(lowerText.includes("avs")) {
    for(const key in avsResponses) {
      const avs = avsResponses[key];
      response += `AVS ${key}: Visa: ${avs.Visa}, MasterCard: ${avs.MasterCard}\n`;
    }
  }

  // Chargeback code
  if(chargebackCodes[text]) {
    response += `Chargeback Code ${text}: ${chargebackCodes[text]}\n`;
  } else if(lowerText.includes("chargeback")) {
    for(const key in chargebackCodes) {
      response += `Chargeback ${key}: ${chargebackCodes[key]}\n`;
    }
  }

  if(response === "") response = "No matching data found.";
  addBubble("bot", response);
}

// --- STARTING AI MESSAGE AND QUICK BUTTONS ---
function initChat() {
  // Pinned drawer prompts
  drawer.innerHTML = `
    <h3>Prompts</h3>
    <ul>
      <li>Type a country name to see all fraud patterns related to it.</li>
      <li>Type "Visa" or "MasterCard" to get all related fraud patterns.</li>
      <li>Type an AVS code (A-Z) to get its meaning or type "AVS" to get all.</li>
      <li>Type a Chargeback code to get its meaning or type "Chargeback" to get all.</li>
      <li>Type an ECI value (01,02,05,06...) to get its meaning.</li>
    </ul>
  `;

  // Starting AI greeting
  addBubble("bot", "Hey! What do you want to learn today?");

  // Quick option buttons (only Chargeback and AVS)
  const optionsContainer = document.createElement("div");
  optionsContainer.style.display = "flex";
  optionsContainer.style.justifyContent = "space-around";
  optionsContainer.style.marginTop = "8px";

  const options = ["Chargeback reason code", "AVS"]; // Removed Fraud Prevention and ECI
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.style.padding = "6px 12px";
    btn.style.borderRadius = "12px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.backgroundColor = "#4f46e5";
    btn.style.color = "#fff";
    btn.style.fontSize = "14px";
    btn.addEventListener("click", () => {
      chatInput.value = opt;
      sendMessage();
    });
    optionsContainer.appendChild(btn);
  });

  chatPanel.appendChild(optionsContainer);
  chatPanel.scrollTop = chatPanel.scrollHeight;
}

// Initialize chat on load
window.addEventListener("load", initChat);
