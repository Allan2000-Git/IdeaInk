"use client"

import DashboardContent from '@/app/_components/DashboardContent';
import { useFileContext } from '@/app/_context/FileContext';
import React, { useEffect } from 'react'

function Dashboard() {
    const {user, checkIfUserExists, isLoading}:any = useFileContext();
    
    useEffect(() => {
        if(user && !isLoading){
            checkIfUserExists();
        }
    }, [user])
    
    return (
        <div className="py-14 px-10">
            <DashboardContent />
        </div>
    )
}

export default Dashboard
