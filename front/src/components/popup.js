import Search from "./search";
import { useState, useEffect } from "react";
import Loading from "./loading";
import Problem from "./problem";
import { useUser } from "@/providers/User.provider";

export default function Popup() {
  const [keypress, setKeypress] = useState({});
  const { popup, setPopup, problems, setProblems } = useUser();

  useEffect(() => {
    document.addEventListener("keydown", keydown, true);
    document.addEventListener("keyup", keyup, true);
  }, []);

  const keydown = (e) => {
    keypress[e.key] = true;
    setKeypress(keypress);
    if (e.key == " " && keypress["Control"]) {
      setPopup({ ...popup, type: "search" });
    }
    if (e.key == "Escape") setPopup({ ...popup, type: "off" });
  };

  const keyup = (e) => {
    keypress[e.key] = false;
    setKeypress(keypress);
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

    setPopup({ ...popup, type: "loading" });
    fetch("api/problems", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        let res = JSON.parse(result);
        if (res.problem) {
          setProblems([...problems, res.problem]);
        } else {
          alert(res.message);
        }
        setPopup({ ...popup, type: "off" });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <section
      className={`w-full h-full absolute top-0 left-0 backdrop-blur-sm z-50 ${
        popup.type == "off" ? "hidden" : ""
      }`}
    >
      <div
        className="h-full w-full flex justify-center items-center"
        onMouseDown={() => {
          setPopup({ ...popup, type: "off" });
        }}
      >
        {
          {
            search: (
              <div className="w-1/2">
                <Search
                  search_function={submit}
                  placeholder="Link"
                  focus={true}
                />
              </div>
            ),
            loading: <Loading />,
            problem: <Problem problem={popup.data} />,
          }[popup.type]
        }
      </div>
    </section>
  );
}
