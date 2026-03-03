import { useState } from "react";
import { ChromePicker } from "react-color";
import styles from "../styles/Chat.module.css";

export default function SettingsMenu({ theme, setTheme, userColor, setUserColor, viewMode, setViewMode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.menuIcon} onClick={() => setOpen(!open)}>⋮</div>
      {open && (
        <div className={styles.settingsDropdown}>
          <div>
            <strong>View Mode:</strong>
            <button onClick={() => setViewMode("mobile")}>Phone</button>
            <button onClick={() => setViewMode("desktop")}>Desktop</button>
          </div>
          <div>
            <strong>Theme:</strong>
            <button onClick={() => setTheme("light")}>Light</button>
            <button onClick={() => setTheme("dark")}>Dark</button>
          </div>
          <div>
            <strong>Chat Color:</strong>
            <ChromePicker
              color={userColor}
              onChangeComplete={(color) => setUserColor(color.hex)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
