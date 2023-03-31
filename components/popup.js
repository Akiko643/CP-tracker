import Search from "./search";
import { useState, useEffect } from "react";
import Loading from "./loading";
import Problem from "./problem";

export default function Popup() {
  const [keypress, setKeypress] = useState({});
  const [popup, setPopup] = useState("off");

  useEffect(() => {
    document.addEventListener("keydown", keydown, true);
    document.addEventListener("keyup", keyup, true);
  }, []);

  const keydown = (e) => {
    keypress[e.key] = 1;
    setKeypress(keypress);
    if (e.key == " " && keypress["Control"]) {
      setPopup("search");
    }
    if (e.key == "Escape") setPopup("off");
    // console.log("down", e.key);
  };

  const keyup = (e) => {
    keypress[e.key] = 0;
    setKeypress(keypress);
    // console.log("up", e.key);
  };

  const submit = (e, val) => {
    e.preventDefault();
    console.log(val);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      url: val,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    setPopup("loading");
    fetch("api/problems", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setPopup("off");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <section
      className={`w-full h-full absolute top-0 left-0 backdrop-blur-sm ${
        popup == "off" ? "hidden" : ""
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
          {
            {
              search: (
                <Search
                  search_function={submit}
                  placeholder="Link"
                  focus={true}
                />
              ),
              loading: <Loading />,
              problem: <Problem />,
            }[popup]
          }
        </div>
      </div>
    </section>
  );
}
