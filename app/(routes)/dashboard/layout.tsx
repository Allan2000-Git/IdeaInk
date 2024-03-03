"use client"

import SideNav from '@/app/_components/SideNav';
import { FileContextProvider } from '@/app/_context/FileContext';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const convex = useConvex();
    const {user}:any = useKindeBrowserClient();
    const router = useRouter();
    const checkIfTeamsForUserExists = async() => {
        const data = await convex.query(api.teams.getTeams, {email: user.email});
        if(!data.length){
            router.push('/teams/create');
        }
    } 

    useEffect(() => {
        if(user){
            checkIfTeamsForUserExists();
        }
    },[user])

    return (
        <div>
            <FileContextProvider>
                <div className="grid grid-cols-4">
                    <SideNav />
                    <div className="col-span-4 ml-[20%]">
                        {children}
                    </div>
                </div>
            </FileContextProvider>
        </div>
    )
}

export default DashboardLayout
