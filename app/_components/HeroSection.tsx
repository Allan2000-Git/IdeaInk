import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'

function HeroSection() {
    return (
        <section className="bg-black/100 text-white h-screen">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-5xl text-center">
                    <div className="space-y-6">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            Elevating Engineering Collaboration
                            <div className="flex items-center gap-3  mt-3">
                                <strong className="font-extrabold text-logo_primary sm:block">Empowering Teams</strong>
                                <strong className="font-extrabold text-logo_secondary sm:block">Enhancing Results</strong>
                            </div>
                        </h1>

                        <p className="mt-4 sm:text-xl/relaxed">
                            All-in-One Markdown Editor and Collaborative Canvas for Dynamic Diagramming
                        </p>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                        className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black flex items-center gap-2 transition hover:bg-white/85"
                        href="/"
                        >
                        Try IdeaInk 
                        <FaArrowRightLong />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
