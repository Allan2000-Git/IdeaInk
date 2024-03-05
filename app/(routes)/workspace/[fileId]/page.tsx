"use client"

import Canvas from '@/app/_components/Canvas';
import WorkSpaceHeader from '@/app/_components/WorkSpaceHeader';
import { Separator } from '@/components/ui/separator';
import { api } from '@/convex/_generated/api';
import { File } from '@/types/ideaink';
import { useConvex } from 'convex/react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// 'const DocumentNoSSR' is a dynamically imported version of the 'Document' component, and it will be rendered only on the client side, bypassing server-side rendering
const DocumentNoSSR = dynamic(async () => import("../../../_components/Document"), { ssr: false });
const CanvasWrapper = dynamic(async () => import("../../../_components/Canvas"), { ssr: false });

function WorkSpace() {
    const {fileId}:any = useParams();
    const [triggerSave, setTriggerSave] = useState(false);
    const [file, setFile] = useState<File|any>();

    const convex = useConvex();

    const getFile = async() => {
        const data = await convex.query(api.files.getFile, {_id: fileId});
        setFile(data);
    }

    useEffect(() => {
        if(fileId){
            getFile();
        }
    },[fileId]);

    return (
        <div>
            <WorkSpaceHeader file={file} onSave={() => setTriggerSave(!triggerSave)} />
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Document */}
                <div className="border-r-2">
                    <DocumentNoSSR onSaveTrigger={triggerSave} fileId={fileId} file={file} />
                </div>
                {/* Canvas */}
                <div className="">
                    <CanvasWrapper onSaveTrigger={triggerSave} fileId={fileId} file={file} />
                </div>
            </div>
        </div>
    )
}

export default WorkSpace
