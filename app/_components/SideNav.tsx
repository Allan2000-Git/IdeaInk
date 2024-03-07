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
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { IoGrid } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"  
import { Input } from '@/components/ui/input';
import { useFileContext } from '../_context/FileContext';
import { Team } from '@/types/ideaink';
import { MAX_FREE_FILES_PLAN } from '@/utils/constants';
import Pricing from './Pricing';
import { Skeleton } from '@/components/ui/skeleton';

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
    const {user, activeTeam, getAllTeams, handleFileCreation, getAllFiles, teams, setActiveTeam, files, setFileName, fileName}:any = useFileContext();

    useEffect(() => {
        if(user){
            getAllTeams();
        }
    },[user]);

    useEffect(() => {
        if(activeTeam){
            getAllFiles();
        }
    },[activeTeam]);

    return (
        <div className="w-[20%] h-screen fixed border-r-2 px-5 pt-14 pb-5 flex flex-col col-span-1">
            {/* Top Section */}
            <div className="flex-1">
                <Popover>
                    {
                        user ? 
                        <PopoverTrigger className="w-full">
                            <div className="flex items-center gap-3 cursor-pointer rounded-md px-3 py-3 bg-gray-100">
                                <Image src="/ideaink-eraser.png" alt="IdeaInk Logo" width={24} height={24} />
                                <div className="flex items-center justify-between flex-1 font-bold">
                                    <span className="text-lg">{activeTeam?.teamName}</span>
                                    <IoMdArrowDropdown size={20} />
                                </div>
                            </div>
                        </PopoverTrigger> :
                        <Skeleton className="h-[40px] w-full" />
                    }
                    <PopoverContent className="p-0 mt-2 w-[260px] text-sm">
                        <div className="flex flex-col gap-2 px-3 py-2">
                            {
                                teams.map((team:Team) => (
                                    <span 
                                    onClick={() => setActiveTeam(team)}
                                    key={team._id}
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
                    <Dialog>
                        <DialogTrigger className="w-full" asChild>
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 transition">New File</Button>
                        </DialogTrigger>
                        {
                            files.length < MAX_FREE_FILES_PLAN ?
                            (
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="text-[16px]">Create a New File</DialogTitle>
                                        <DialogDescription>
                                            <Input value={fileName} onChange={e => setFileName(e.target.value)} type="text" className="text-black font-medium" placeholder="File name must be of minimum 3 characters" />
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="sm:justify-start">
                                        <DialogClose asChild>
                                            <Button 
                                            onClick={() => handleFileCreation(fileName)}
                                            disabled={fileName.length < 3} 
                                            type="button" 
                                            className="bg-blue-500 hover:bg-blue-600 transition">
                                                Create
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            ): <DialogContent className="max-w-3xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-[16px]">Upgrade your Plan</DialogTitle>
                                        <DialogDescription>
                                            <Pricing />
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="sm:justify-start">
                                        <DialogClose asChild>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                        }
                    </Dialog>
                </div>

                <div className="mt-7 text-sm">
                    <div className="w-full h-4 rounded-full bg-gray-200">
                        <div style={{width: `${files.length / 5 * 100}%`}} className={`h-4 ${files.length >= 5 ? "bg-red-500" : "bg-blue-500"} rounded-full`}>
                        </div>
                    </div>
                    <p className="my-2"><strong>{files.length}</strong> out of <strong>5</strong> files used.</p>
                    <p><span className="underline">Upgrade</span> your plan for unlimited access.</p>
                </div>
            </div>
        </div>
    )
}

export default SideNav
