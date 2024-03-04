"use client";

import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";

const ExcalidrawWrapper: React.FC = () => {
    return (
        <div className="h-screen w-full overflow-auto">  
            <Excalidraw theme="dark">
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