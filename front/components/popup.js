import Search from "./search";
import { useState, useEffect } from "react";

export default function Popup() {
  const [keypress, setKeypress] = useState({});
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", keydown, true);
    document.addEventListener("keyup", keyup, true);
  }, []);

  const keydown = (e) => {
    keypress[e.key] = 1;
    setKeypress(keypress);
    if (e.key == " " && keypress["Control"]) {
      setPopup(true);
    }
    if (e.key == "Escape") setPopup(false);
    // console.log("down", e.key);
  };

  const keyup = (e) => {
    keypress[e.key] = 0;
    setKeypress(keypress);
    // console.log("up", e.key);
  };

  const submit = (e, val) => {
    e.preventDefault();
    console.log(e, val);
  };

  return (
    <section
      className={`w-full h-full absolute top-0 left-0 backdrop-blur-sm ${
        !popup ? "hidden" : ""
      }`}
    >
      <div
        className="h-full w-full flex justify-center items-center"
        onClick={() => {
          setPopup(false);
        }}
      >
        <div
          className="w-2/4 h-16"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Search search_function={submit} placeholder="Link" focus={true} />
        </div>
      </div>
    </section>
  );
}
