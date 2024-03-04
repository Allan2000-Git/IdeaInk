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

function FilesTable() {
    const {files}:any = useFileContext();
    const router = useRouter();

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
                                onClick={() => router.push(`/workspace/${file._id}`)} 
                                className="cursor-pointer"
                                key={file._id}>
                                    <TableCell>{file.fileName}</TableCell>
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
                                                <DropdownMenuItem className="flex items-center text-sm gap-2 cursor-pointer hover:bg-red-600">
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
