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

  // Replace YOUR_BACKEND_URL with actual backend
  axios.get(`https://YOUR_BACKEND_URL/fraud?keyword=${encodeURIComponent(text)}`)
    .then(res => addBubble("bot", JSON.stringify(res.data.results, null, 2)))
    .catch(err => addBubble("bot", "Error fetching response"));
}
