import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import SettingsMenu from "../components/SettingsMenu";
import styles from "../styles/Chat.module.css";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [theme, setTheme] = useState("light");
  const [userColor, setUserColor] = useState("#4f46e5"); // default purple
  const [viewMode, setViewMode] = useState("mobile");
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text) return;
    setMessages([...messages, { sender: "user", text }]);

    // Send to backend (replace YOUR_BACKEND_URL with actual)
    try {
      const res = await axios.get(`YOUR_BACKEND_URL/fraud?keyword=${encodeURIComponent(text)}`);
      setMessages((prev) => [...prev, { sender: "fa-bot", text: JSON.stringify(res.data.results, null, 2) }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "fa-bot", text: "Error fetching response." }]);
    }
  };

  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}>
      <header className={styles.header}>
        <div className={styles.logo}>FA.bot</div>
        <SettingsMenu
          theme={theme}
          setTheme={setTheme}
          userColor={userColor}
          setUserColor={setUserColor}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </header>

      <main className={`${styles.chatPanel} ${viewMode === "desktop" ? styles.desktop : ""}`}>
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} userColor={userColor} />
        ))}
        <div ref={scrollRef} />
      </main>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
                 }
