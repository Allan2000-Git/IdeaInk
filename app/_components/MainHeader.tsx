"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function Header() {
    const { user } = useKindeBrowserClient();

    // useEffect(() => {
    //     console.log(user);
        
    // }, [user])

    return (
        <header className={`bg-black py-3 backdrop-sepia`}>
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
                    {
                        user ?
                        (
                            <div className="sm:flex sm:gap-4">
                                <LogoutLink
                                    postLogoutRedirectURL='/'
                                    className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black flex items-center gap-2 transition hover:bg-white/85"
                                >
                                    Logout
                                </LogoutLink>
                            </div>
                        ):(
                            <div className="sm:flex sm:gap-4">
                                <LoginLink
                                    postLoginRedirectURL='/dashboard'
                                    className="rounded-md px-5 py-2.5 text-sm font-medium transition text-white shadow hover:text-gray-400"
                                >
                                    Login
                                </LoginLink>

                                <div className="hidden sm:flex">
                                    <RegisterLink
                                    className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black flex items-center gap-2 transition hover:bg-white/85"
                                    >
                                    Try IdeaInk 
                                    <FaArrowRightLong />
                                    </RegisterLink>
                                </div>
                            </div>
                        )
                    }

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
