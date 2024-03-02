"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

function Header() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        let timeoutId: string | number | NodeJS.Timeout | undefined;

        //debounce the scroll event listener to reduce the frequency of updates and prevent performance bottlenecks
        const handleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (window.scrollY > 0) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            }, 100); // Adjust the debounce delay as needed
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <header className={`bg-black py-3 ${isSticky ? 'sticky z-50 top-0' : ''} backdrop-sepia`}>
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                <div className="md:flex md:items-center md:gap-12">
                    <Link href="/">
                        <Image src="/ideaink-logo.svg" alt="logo" width={126} height={100} />
                    </Link>
                </div>

                <div className="hidden md:block">
                    <nav aria-label="Global">
                    <ul className="flex items-center gap-8 text-sm">
                        <li>
                        <Link className="text-white transition hover:text-logo_primary" href="/"> Use Cases </Link>
                        </li>

                        <li>
                        <Link className="text-white transition hover:text-logo_primary" href="/"> Resources </Link>
                        </li>

                        <li>
                        <Link className="text-white transition hover:text-logo_primary" href="/"> About </Link>
                        </li>

                        <li>
                        <Link className="text-white transition hover:text-logo_primary" href="/"> Pricing </Link>
                        </li>

                        <li>
                        <Link className="text-white transition hover:text-logo_primary" href="/"> Blog </Link>
                        </li>
                    </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="sm:flex sm:gap-4">
                    <Link
                        className="rounded-md px-5 py-2.5 text-sm font-medium transition text-white shadow hover:text-gray-400"
                        href="/"
                    >
                        Login
                    </Link>

                    <div className="hidden sm:flex">
                        <Link
                        className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black flex items-center gap-2 transition hover:bg-white/85"
                        href="/"
                        >
                        Try IdeaInk 
                        <FaArrowRightLong />
                        </Link>
                    </div>
                    </div>

                    <div className="block md:hidden">
                    <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </header>
    )
}

export default Header
