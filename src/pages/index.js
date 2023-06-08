import Head from "next/head";
import Image from "next/image";
import { isValidElement, use, useEffect, useRef, useState } from "react";
import Filter from "../components/filter";
import Popup from "../components/popup";
import ProblemList from "../components/problemList";
import Search from "../components/search";
import Source from "../components/source";
import io from "socket.io-client";
import { useUser } from "@/providers/User.provider";
let socket;

export default function Home() {
    const { filter, setFilter } = useUser();

    const search_function = (e, search) => {
        // setFilter({ ...filter, search: search });
    };

    return (
        <>
            <Head>
                <title>CP Tracker</title>
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
                        <ProblemList />
                    </section>
                    <div className="flex-1">
                        <section className="mb-8 h-12">
                            <Search
                                search_function={search_function}
                                placeholder="Search"
                            />
                        </section>

                        <Filter />
                    </div>
                </section>
            </main>
        </>
    );
}
