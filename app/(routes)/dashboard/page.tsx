"use client"

import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react';
import React, { useEffect } from 'react'

function Dashboard() {
    const {user, isLoading}: any = useKindeBrowserClient();
    const getUser = useQuery(api.user.getUser, {email: user?.email});
    const createUser = useMutation(api.user.createUser);

    const convex = useConvex();
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

    useEffect(() => {
        if(user && !isLoading){
            checkIfUserExists();
        }
        
    }, [user])
    
    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard
