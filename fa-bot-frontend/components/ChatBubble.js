import styles from "../styles/Chat.module.css";

export default function ChatBubble({ sender, text, userColor }) {
  return (
    <div className={`${styles.bubbleContainer} ${sender === "user" ? styles.user : styles.bot}`}>
      <div
        className={styles.bubble}
        style={{ backgroundColor: sender === "user" ? userColor : "#e5e7eb", color: sender === "user" ? "#fff" : "#000" }}
      >
        <pre>{text}</pre>
      </div>
    </div>
  );
}
