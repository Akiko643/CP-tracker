import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";

import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [tagList, setTagList] = useState([]);

    const [popup, setPopup] = useState({
        type: "off",
    });

    const [filter, setFilter] = useState({
        source: { name: "All Source", source: "All Source" },
        search: "",
        lowerRating: null,
        upperRating: null,
    });

    const source = [
        { name: "All Source", source: "All Source" },
        { name: "Codeforces", source: "codeforces.com" },
        { name: "Usaco", source: "usaco.com" },
        { name: "Leetcode", source: "leetcode.com" },
    ];
    const sourceToName = {
        "All Source": "All Source",
        "codeforces.com": "Codeforces",
        "usaco.com": "Usaco",
        "leetcode.com": "Leetcode.com",
    };
    const [problems, setProblems] = useState([]);
    const [token, setToken] = useCookie("token");

    useEffect(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch("api/problems", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setProblems(JSON.parse(result).problems);
            })
            .catch((error) => {
                console.log("Error!");
                alert(error);
            });
    }, []);

    useEffect(() => {
        if (problems?.length) {
            let ans = [];
            problems.forEach((problem) => {
                problem.tags.forEach((tag) => {
                    if (!ans.includes(tag)) ans.push(tag);
                });
            });
            setTagList(ans);
        }
    }, [problems]);

    return (
        <UserContext.Provider
            value={{
                problems,
                setProblems,
                popup,
                setPopup,
                filter,
                setFilter,
                source,
                sourceToName,
                tagList,
                token,
                setToken,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export const useCookie = (key) => {
    const [cookie, setCookie] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const data = Cookies.get(key);
        try {
            setCookie(JSON.parse(data));
        } catch {
            setCookie(data);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            if (!cookie) {
                Cookies.remove(key);
            } else {
                const CookieValue =
                    typeof cookie === "string"
                        ? cookie
                        : JSON.stringify(cookie);

                Cookies.set(key, CookieValue);
            }
        }
    }, [cookie]);

    return [cookie, setCookie, loading];
};
