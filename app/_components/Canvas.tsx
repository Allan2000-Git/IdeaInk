"use client";

import { api } from "@/convex/_generated/api";
import { File } from "@/types/ideaink";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface ICanvasProps {
    onSaveTrigger: boolean,
    fileId: any,
    file: File
}

const ExcalidrawWrapper = ({onSaveTrigger, fileId, file}: ICanvasProps) => {
    const [excalidrawData, setExcalidrawData] = useState<ExcalidrawElement | any>();

    // mutation to update document
    const updateWhiteboard = useMutation(api.files.updateWhiteboard);

    const handleSaveWhiteboard = () => {
        updateWhiteboard({
            _id: fileId,
            whiteboard: JSON.stringify(excalidrawData)
        })
        .then(() => {
            toast.success('Canvas saved')
        });
    }

    useEffect(() => {
        if(onSaveTrigger){
            handleSaveWhiteboard();
        }
    },[onSaveTrigger]);

    return (
        <div className="h-screen w-full overflow-auto">  
            <Excalidraw
            initialData={{
                elements: file && file.whiteboard ? JSON.parse(file.whiteboard) : [],
                scrollToContent: true
            }}
            onChange={(excalidrawElements, appState, files) => setExcalidrawData(excalidrawElements)}
            theme="dark">
                <WelcomeScreen>
                    <WelcomeScreen.Center>
                        <WelcomeScreen.Center.Logo />
                            <WelcomeScreen.Center.Heading>
                                Welcome to IdeaInk Canvas!
                            </WelcomeScreen.Center.Heading>
                        <WelcomeScreen.Center.Menu>
                            <WelcomeScreen.Center.MenuItemLink href="https://github.com/Allan2000-Git/IdeaInk">
                                Excalidraw GitHub
                            </WelcomeScreen.Center.MenuItemLink>
                            <WelcomeScreen.Center.MenuItemHelp />
                        </WelcomeScreen.Center.Menu>
                    </WelcomeScreen.Center>
                </WelcomeScreen>
            </Excalidraw>
        </div> 
    );
};
export default ExcalidrawWrapper;