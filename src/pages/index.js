import Head from "next/head";
import Image from "next/image";
import { isValidElement, useEffect, useRef, useState } from "react";
import Filter from "../../components/filter";
import Popup from "../../components/popup";
import Search from "../../components/search";
import Source from "../../components/source";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Home() {
    const status_color = {
        "Not Attempted": "bg-gray-600",
        Solving: "bg-orange-600",
        Solved: "bg-green-600",
        Reviewing: "bg-red-600",
        Skipped: "bg-blue-600",
        Ignored: "bg-red-900",
    };

    const [filter, setFilter] = useState({
        source: "All Source",
        search: "",
    });

    const data = {
        source: ["All Source", "Codeforces", "Usaco", "Leetcode"],
        problems: [
            { name: "A. Likes", rating: 800, status: "Solving" },
            { name: "E. Tree Master", rating: 2200, status: "Solved" },
            { name: "C. Sequence Master", rating: 1600, status: "Reviewing" },
            { name: "D. DSU Master", rating: 2500, status: "Not Attempted" },
            { name: "B. Mex Master", rating: 900, status: "Skipped" },
            { name: "B. Mex Mastee", rating: 900, status: "Skipped" },
            {
                name: "F. Approximate Diameter",
                rating: 2700,
                status: "Ignored",
            },
        ],
    };

    const search_function = (e, search) => {
        e.preventDefault();
        console.log(search);
        setFilter({ ...filter, search: search });
    };

    useEffect(() => {
        socket.on("collection_updated", () => {
            fetch("/api/getDataFromMongoDB")
                .then((res) => res.json())
                .then((data) => setData(data));
        });
    }, []);

    return (
        <>
            <Head>
                <title>CP Trainer</title>
                <meta
                    name="description"
                    content="Helps with tracking CP problems"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col items-center w-screen p-8 h-screen bg-zinc-900 text-white">
                <Popup />
                <section className="flex w-9/12 justify-between">
                    <section className="w-8/12 mr-8">
                        <Source
                            data={data}
                            setFilter={setFilter}
                            filter={filter}
                        />
                        <div className="w-full flex justify-between border-b border-zinc-400 h-12 items-center">
                            <div className="flex w-8/12">
                                <div className="px-4 text-zinc-400 text-sm w-1/4">
                                    Status
                                </div>
                                <div className="px-4 text-zinc-400 text-sm w-3/4">
                                    Title
                                </div>
                            </div>
                            <div className="px-4 text-zinc-400 text-sm w-2/12">
                                Difficulty
                            </div>
                        </div>
                        <div className="">
                            {data.problems.map((p, i) => {
                                return (
                                    <div
                                        className={`flex justify-between h-12 w-full rounded items-center ${
                                            i % 2 ? "bg-zinc-700" : ""
                                        }`}
                                        key={`problem-${i}`}
                                    >
                                        <div className="flex w-8/12">
                                            <div className="w-1/4 px-4">
                                                <div
                                                    className={`rounded-full h-6 w-6 ${
                                                        status_color[p.status]
                                                    }`}
                                                ></div>
                                            </div>
                                            <h2 className="w-3/4 px-4">
                                                {p.name}
                                            </h2>
                                        </div>
                                        <h2 className="w-2/12 px-4">
                                            {p.rating}
                                        </h2>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                    <div className="flex-1">
                        <section className="mb-8 h-12">
                            <Search
                                search_function={search_function}
                                placeholder="Search"
                            />
                        </section>

                        <Filter filter={filter} setFilter={setFilter} />
                    </div>
                </section>
            </main>
        </>
    );
}
