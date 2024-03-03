import { createContext, useContext, useState } from "react";
import { api } from '@/convex/_generated/api';
import { useConvex, useMutation } from 'convex/react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Team } from '@/types/types';
import { toast } from 'sonner';

export const FileContext = createContext({});

export const FileContextProvider = ({children}:any) => {
    const {user, isLoading}: any = useKindeBrowserClient();
    const createUser = useMutation(api.user.createUser);
    const [teams, setTeams] = useState<Team[]>([]);
    const [activeTeam, setActiveTeam] = useState<Team>();
    const [fileName, setFileName] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const convex = useConvex();
    const createNewFile = useMutation(api.files.createFile);

    const checkIfUserExists = async() => {
        const data = await convex.query(api.user.getUser, {email: user.email});
        if(!data.length){
            createUser({
                name: user.given_name,
                email: user.email,
                picture: user.picture
            })
            .then(res => console.log("User created: ", res))
        }
    }

    // Get all the teams
    const getAllTeams = async () => {
        const data = await convex.query(api.teams.getTeams, {email: user?.email});
        setTeams(data);
        setActiveTeam(data[0]);
    }

    // Create New File
    const handleFileCreation = (fileName:string) => {
        createFile(fileName);   
    }

    const createFile = (fileName: string) => {
        createNewFile({
            fileName,
            teamId:activeTeam?._id,
            createdBy: user?.email,
            archive: false,
            document: "Default Document Name",
            whiteboard: "Default Whiteboard Name",
            userPicture: user?.picture
        })
        .then(res => {
            if(res){
                getAllFiles();
                toast(`A new ${fileName} file has been created.`);
            }
        })
        .catch(err => toast(`${err.message}`));
    }

    // Get all files
    const getAllFiles = async () => {
        const data = await convex.query(api.files.getFiles, {teamId: activeTeam?._id});
        setFiles(data);
    }

    return(
        <FileContext.Provider value={{user, checkIfUserExists, isLoading, getAllTeams, handleFileCreation, createFile, getAllFiles, activeTeam, teams, setActiveTeam, files, setFileName, fileName}}>
            {children}
        </FileContext.Provider>
    )
}

export const useFileContext = () => {
    return useContext(FileContext);
}