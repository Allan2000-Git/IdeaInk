import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"  
import { Archive, MoreHorizontal, Trash } from 'lucide-react'
import { useFileContext } from '../_context/FileContext';
import { File } from '@/types/ideaink';
import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

function FilesTable() {
    const {files, getAllFiles}:any = useFileContext();
    const router = useRouter();

    const deleteFile = useMutation(api.files.deleteFile);

    const handleFileDelete = (fileId: any, fileName: any) => {
        deleteFile({
            fileId
        })
        .then(() => {
            getAllFiles();
            toast(`File ${fileName} has been deleted.`);
        })
        .catch(err => toast(`${err.message}`));
    }

    const handleFileOpen = (event: any, fileId: any) => {
        event.stopPropagation();
        router.push(`/workspace/${fileId}`)
    }

    return (
        <>
            <div className="mt-20">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>FILE NAME</TableHead>
                            <TableHead>CREATED BY</TableHead>
                            <TableHead>CREATED AT</TableHead>
                            <TableHead>AUTHOR</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            files.map((file:File) => (
                                <TableRow 
                                className="cursor-pointer"
                                key={file._id}>
                                    <TableCell onClick={(e) => handleFileOpen(e, file._id)}>{file.fileName}</TableCell>
                                    <TableCell>{file.createdBy}</TableCell>
                                    <TableCell>{formatDate(file._creationTime)}</TableCell>
                                    <TableCell>
                                        <Image 
                                        className="rounded-full" 
                                        src={file.userPicture} 
                                        alt={`${file.createdBy} profile picture`} 
                                        width={30} height={30} />
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><MoreHorizontal /></DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem className="flex items-center text-sm gap-2 cursor-pointer hover:bg-blue-600">
                                                    <Archive size={16} /> Archive
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                onClick={() => handleFileDelete(file._id, file.fileName)}
                                                className="flex items-center text-sm gap-2 cursor-pointer hover:bg-red-600">
                                                    <Trash size={16} /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default FilesTable
