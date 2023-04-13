import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [popup, setPopup] = useState({
    type: "off",
  });

  const [filter, setFilter] = useState({
    source: { name: "All Source", source: "All Source" },
    search: "",
    lowerRating: null,
    upperRating: null,
  });

  const [data, setData] = useState({
    source: [
      { name: "All Source", source: "All Source" },
      { name: "Codeforces", source: "codeforces.com" },
      { name: "Usaco", source: "usaco.com" },
      { name: "Leetcode", source: "leetcode.com" },
    ],
    problems: [],
  });

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("api/problems", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData({ ...data, problems: JSON.parse(result).problems });
      })
      .catch((error) => {
        console.log("Error!");
        alert(error);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{ data, setData, popup, setPopup, filter, setFilter }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
