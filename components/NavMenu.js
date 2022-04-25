import { BiX } from "react-icons/bi";
import styles from "../styles/NavMenu.module.css";

export default function NavMenu({ toggleMenu, isMenuOpen }) {
  return (
    <div
      className={`${styles.menu} ${isMenuOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.header}>
        Menu
        <button className="close" onClick={toggleMenu}>
          <BiX size={24} />
        </button>
      </div>
    </div>
  );
}
