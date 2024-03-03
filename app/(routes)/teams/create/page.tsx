"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation } from 'convex/react'
import { Users } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from "sonner"

function CreateTeam() {
    const [teamName, setTeamName] = useState("");
    const {user}: any = useKindeBrowserClient();
    const router = useRouter();

    const createNewTeam = useMutation(api.teams.createTeam);
    const createTeam = () => {
        createNewTeam({
            createdBy: user?.email,
            teamName
        })
        .then(res => {
            if(res){
                router.push('/dashboard');
                toast(`A new ${teamName} team has been created.`);
            }
        })
    }

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-24">
                    <div className="h-full rounded-lg order-1 lg:order-last flex justify-center flex-col items-center">
                        <div className="flex items-center gap-2 bg-green-800/60 py-1 px-2 rounded-full text-sm text-green-900/90">
                            <Users />
                            Team Name
                        </div>
                        <h2 className="text-black/85 text-3xl font-bold mt-14">What should we call your team?</h2>
                        <span className="text-gray-500/60 mt-5">You can always change this later from settings.</span>
                        <div className="w-full mt-[40px]">
                            <Label className="text-gray-500/80 text-[16px]" htmlFor="text">Team Name</Label>
                            <Input value={teamName} onChange={e => setTeamName(e.target.value)} className="mt-3" type="text" placeholder="Team name must be of minimum 3 characters" />
                        </div>
                        <Button onClick={createTeam} disabled={teamName.length<3} className="mt-10 w-1/2 h-[45px]">Continue</Button>
                    </div>

                    <div className="lg:py-24">
                        <h2 className="text-3xl font-bold sm:text-4xl">Start Building Your Team Today!</h2>

                        <p className="mt-4 text-gray-600">
                            Create your first team and collaborate seamlessly with your colleagues. Get started in just a few simple steps.
                        </p>

                        <Image className="mt-[40px]" src="/ideaink-logo.svg" alt="IdeaInk Logo" width={150} height={150} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateTeam
