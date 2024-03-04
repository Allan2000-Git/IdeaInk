"use client"

import Document from '@/app/_components/Document';
import WorkSpaceHeader from '@/app/_components/WorkSpaceHeader';
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation'
import React from 'react'

// 'const DocumentNoSSR' is a dynamically imported version of the 'Document' component, and it will be rendered only on the client side, bypassing server-side rendering
const DocumentNoSSR = dynamic(() => import("../../../_components/Document"), { ssr: false });

function WorkSpace() {
    const {fileId} = useParams();

    return (
        <div>
            <WorkSpaceHeader />
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 h-screen py-5">
                {/* Document */}
                <div className="">
                    <DocumentNoSSR />
                </div>

                {/* Canvas */}
                <div className="bg-logo_primary/70">

                </div>
            </div>
        </div>
    )
}

export default WorkSpace
