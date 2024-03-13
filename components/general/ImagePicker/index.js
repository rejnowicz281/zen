"use client";

import { FaXmark } from "@react-icons/all-files/fa6/FaXmark";
import { useRef, useState } from "react";
import css from "./index.module.css";

export default function ImagePicker({ name, id }) {
    const [imageIsSet, setImageIsSet] = useState(false);
    const inputRef = useRef(null);

    function handleImageChange(e) {
        setImageIsSet(true);
    }

    function handleCancelImage() {
        setImageIsSet(false);
        inputRef.current.value = "";
    }

    return (
        <div className={css.container}>
            <input name={name} className={css.input} id={id} type="file" ref={inputRef} onChange={handleImageChange} />
            {imageIsSet && (
                <button className={css.cancel} type="button" onClick={handleCancelImage}>
                    <FaXmark />
                </button>
            )}
        </div>
    );
}
