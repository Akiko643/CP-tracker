import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [data, setData] = useState({
        source: [
            { name: "All Source" },
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
        console.log("gg");

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
        <UserContext.Provider value={{ data, setData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
