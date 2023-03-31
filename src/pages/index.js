import Head from "next/head";
import Image from "next/image";
import { isValidElement, use, useEffect, useRef, useState } from "react";
import Filter from "../../components/filter";
import Popup from "../../components/popup";
import ProblemList from "../../components/problemList";
import Search from "../../components/search";
import Source from "../../components/source";
import io from "socket.io-client";
let socket;

export default function Home() {
    const [filter, setFilter] = useState({
        source: { name: "All Source" },
        search: "",
    });

    const search_function = (e, search) => {
        e.preventDefault();
        console.log(search);
        setFilter({ ...filter, search: search });
    };

    useEffect(() => {
        socketInitializer();
    }, []);

    const socketInitializer = async () => {
        await fetch("/api/socket");
        socket = io();

        socket.on("connect", () => {
            console.log("connected");
        });
    };

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
                        <ProblemList filter={filter} setFilter={setFilter} />
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
