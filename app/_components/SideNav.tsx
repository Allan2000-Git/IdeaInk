"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Archive, Flag, Github, Lock, LogOut, Settings, Users } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Team } from '@/types/types';
import Link from 'next/link';
import { IoGrid } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress"

const topSectionOptions = [
    {
        id: 1,
        name: "Create Team",
        path: "/teams/create",
        icon: Users
    },
    {
        id: 2,
        name: "Settings",
        path: "/dashboard/settings",
        icon: Settings
    }
]

const bottomSectionOptions = [
    {
        id: 1,
        name: "Getting Started",
        path: "/teams/create",
        icon: Flag
    },
    {
        id: 2,
        name: "Github Sync",
        path: "/",
        icon: Github
    },
    {
        id: 3,
        name: "Private Files",
        path: "/",
        icon: Lock
    },
    {
        id: 4,
        name: "Archive",
        path: "/dashboard/archive",
        icon: Archive
    }
]

function SideNav() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [activeTeam, setActiveTeam] = useState<Team>();

    const {user}:any = useKindeBrowserClient();
    const convex = useConvex();

    const getAllTeams = async () => {
        const data = await convex.query(api.teams.getTeams, {email: user?.email});
        setTeams(data);
        setActiveTeam(data[0]);
    }

    useEffect(() => {
        if(user){
            getAllTeams();
        }
    },[user])

    return (
        <div className="w-[20%] h-screen fixed border-r-2 px-5 pt-14 pb-5 flex flex-col">
            {/* Top Section */}
            <div className="flex-1">
                <Popover>
                    <PopoverTrigger className="w-full">
                        <div className="flex items-center gap-3 bg-gray-200/50 cursor-pointer rounded-md px-3 py-3">
                            <Image src="/ideaink-eraser.png" alt="IdeaInk Logo" width={24} height={24} />
                            <div className="flex items-center justify-between flex-1 font-bold">
                                <span>{activeTeam?.teamName}</span>
                                <IoMdArrowDropdown />
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 mt-2 w-[260px] text-sm">
                        <div className="flex flex-col gap-2 px-3 py-2">
                            {
                                teams.map((team) => (
                                    <span 
                                    onClick={() => setActiveTeam(team)}
                                    className={`${activeTeam?._id === team?._id ? "bg-blue-500 text-white" : ""}  px-3 py-2.5 rounded-md font-medium cursor-pointer`}>
                                        {team?.teamName}
                                    </span>
                                ))
                            }
                        </div>
                        <Separator />
                        <div className="flex flex-col px-2 py-2">
                            {
                                topSectionOptions.map(option => (
                                    <Link href={option.path} key={option.id} className="flex items-center gap-2 hover:bg-gray-200/50 px-2 py-2 rounded-md cursor-pointer transition-all">
                                        <option.icon size={16} />
                                        {option.name}
                                    </Link>
                                ))
                            }
                            <LogoutLink>
                                <div className="flex items-center gap-2 hover:bg-gray-200/50 px-2 py-2 rounded-md cursor-pointer transition-all">
                                    <LogOut size={16} />
                                    Logout
                                </div>
                            </LogoutLink>
                        </div>
                        <Separator />
                        {
                            user && 
                            <div className="flex items-center gap-3 px-2 py-3">
                                <Image className="rounded-full" src={user?.picture} alt={`${user?.given_name} profile picture`} width={35} height={35} />
                                <div>
                                    <p className="font-semibold text-[14px] capitalize">{user?.given_name} {user?.family_name}</p>
                                    <p className="text-[13px]">{user?.email}</p>
                                </div>
                            </div>
                        }
                    </PopoverContent>
                </Popover>
                <div className="flex items-center mt-10 gap-2 bg-gray-200/50 cursor-pointer rounded-md px-3 py-2.5 border-[1px] border-gray-300 font-semibold text-sm">
                    <IoGrid size={16} />
                    <span>All Files</span>
                </div>
            </div>
            {/* Bottom Section */}
            <div>
                <div className="text-sm">
                    {
                        bottomSectionOptions.map(option => (
                            <Link href={option?.path} key={option.id} className="flex items-center gap-2 hover:bg-gray-200/50 px-2 py-2 rounded-md cursor-pointer transition-all">
                                <option.icon size={16} />
                                {option.name}
                            </Link>
                        ))
                    }
                </div>
                <div className="mt-7">
                    <Button className="w-full bg-blue-500">New File</Button>
                </div>
                <div className="mt-7 text-sm">
                    <div className="w-full h-4 rounded-full bg-gray-200">
                        <div className="w-[20%] h-4 bg-blue-500 rounded-full">
                        </div>
                    </div>
                    <p className="my-2"><strong>1</strong> out of <strong>5</strong> files used.</p>
                    <p><span className="underline">Upgrade</span> your plan for unlimited access.</p>
                </div>
            </div>
        </div>
    )
}

export default SideNav
