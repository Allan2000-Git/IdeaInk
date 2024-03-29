import { Button } from '@/components/ui/button'
import { sendEmailToUser } from '@/lib/nodemailer'
import { File } from '@/types/ideaink'
import { Link, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface IWorkSpaceHeaderProps {
    onSave: any,
    file: File
}

function WorkSpaceHeader({onSave, file}:IWorkSpaceHeaderProps) {


    return (
        <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
                <Image src="/ideaink-eraser.png" alt="IdeaInk Logo" width={35} height={35} />
                <h1 className="text-lg font-semibold">{file?.fileName}</h1>
            </div>
            <div className="border-[1.5px] rounded-md p-1">
                <Button variant="ghost">Document</Button>
                <Button variant="ghost">Both</Button>
                <Button variant="ghost">Canvas</Button>
            </div>
            <div className="flex items-center gap-3">
                <Button onClick={()=>onSave()} className="flex items-center bg-red-500 hover:bg-red-600 gap-2">
                    <Save size={14} />
                    Save
                </Button>
                <Button variant="outline">Join Slack Community</Button>
                <Button className="flex items-center bg-blue-500 hover:bg-blue-600 gap-2">
                    <Link size={14} />
                    Invite
                </Button>
            </div>
        </div>
    )
}

export default WorkSpaceHeader
