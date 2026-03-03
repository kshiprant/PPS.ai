import { useState } from "react";
import styles from "../styles/Chat.module.css";

export default function ChatInput({ sendMessage }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    sendMessage(text);
    setText("");
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="Type your query..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
