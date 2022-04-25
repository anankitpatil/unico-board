import { useState, useEffect, useRef } from "react";
import { BiX } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../styles/AddDialog.module.css";

const schema = yup
  .object({
    title: yup.string().required(),
    list: yup.string().required(),
    label: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

export default function AddDialog({
  position,
  setIsAddDialogOpen,
  addRef,
  addCard,
}) {
  const [fade, setFade] = useState(false);
  const dialogRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addCard(data);
    closeDialog();
  };

  const closeDialog = () => {
    setFade(false);
    setTimeout(() => setIsAddDialogOpen(false), 300);
  };

  const handleWindowClick = (e) => {
    if (
      dialogRef.current !== e.target &&
      !dialogRef.current.contains(e.target) &&
      addRef.current != e.target &&
      !addRef.current.contains(e.target)
    ) {
      closeDialog();
    }
  };

  useEffect(() => {
    setTimeout(() => setFade(true), 100);
    document.addEventListener("click", handleWindowClick);
    return () => {
      document.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <div
      className={`${styles.container} ${fade ? "" : styles.hide}`}
      style={{ top: position.top + "px", left: position.left + "px" }}
      ref={dialogRef}
    >
      <div className={styles.header}>
        Add a card
        <button className="close" onClick={closeDialog}>
          <BiX size={24} />
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input {...register("title")} />
        <p>{errors.title?.message}</p>
        <label>List</label>
        <input {...register("list")} />
        <p>{errors.list?.message}</p>
        <label>Label</label>
        <input {...register("label")} />
        <p>{errors.label?.message}</p>
        <label>Description</label>
        <textarea {...register("description")} />
        <p>{errors.description?.message}</p>
        <button type="submit">Add card</button>
      </form>
    </div>
  );
}
