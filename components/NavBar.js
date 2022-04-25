import { useState, useEffect, useRef } from "react";
import { BiListPlus, BiDotsHorizontalRounded } from "react-icons/bi";
import AddDialog from "../components/AddDialog";
import { getBrowser } from "../helpers/functions";
import styles from "../styles/NavBar.module.css";

export default function NavBar({ addCard, toggleMenu }) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [position, setPosition] = useState(false);
  const addRef = useRef(null);

  const handleResize = () => {
    let pos = {};
    pos.top = addRef.current.getBoundingClientRect().bottom - 6;
    if (getBrowser() === "Safari")
      pos.left = addRef.current.getBoundingClientRect().left - 52;
    else pos.left = addRef.current.getBoundingClientRect().left - 15;
    setPosition(pos);
  };

  const toggleAddDialog = (e) => {
    e.preventDefault();
    setIsAddDialogOpen(!isAddDialogOpen);
  };

  useEffect(() => {
    handleResize();
    document.addEventListener("resize", handleResize, false);
    return () => {
      document.removeEventListener("resize", handleResize, false);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>Unico Connect</div>
        <a href="#" className="btn" onClick={toggleAddDialog} ref={addRef}>
          <BiListPlus size={24} /> Add
        </a>
        {isAddDialogOpen && (
          <AddDialog
            position={position}
            setIsAddDialogOpen={setIsAddDialogOpen}
            addRef={addRef}
            addCard={addCard}
          />
        )}
      </div>
      <div className={styles.right}>
        <a href="#" className="btn" onClick={toggleMenu}>
          <BiDotsHorizontalRounded size={24} /> Show menu
        </a>
      </div>
    </nav>
  );
}
