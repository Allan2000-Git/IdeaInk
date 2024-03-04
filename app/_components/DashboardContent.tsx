import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { KindeUser } from '@/types/ideaink'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import FilesTable from './FilesTable'

function DashboardContent() {
    const {user}:any = useKindeBrowserClient();

    return (
        <>
            <div className="flex items-center w-full justify-between mt-5">
                <div className="flex items-center text-sm gap-5 font-medium">
                    <span>All</span>
                    <span>Recents</span>
                    <span>Created by Me</span>
                    <span>Folders</span>
                    <span>Sorted / Unsorted</span>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex items-center border-2 border-gray-200 rounded-md px-2">
                        <Search size={16} />
                        <Input className="outline-none border-none flex-1 focus:border-white active:outline-white" type="text" placeholder="Search" />
                    </div>
                    <Image src={user?.picture} alt={`${user?.given_name} profile pciture`} width={40} height={40} className="rounded-full" />
                    <Button className="flex items-center bg-blue-500 hover:bg-blue-600 gap-2">
                        <Send size={14} />
                        Invite
                    </Button>
                </div>
            </div>
            <FilesTable />
        </>
    )
}

export default DashboardContent
