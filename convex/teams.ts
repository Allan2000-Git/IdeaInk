import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTeams = query({
    args:{
        email: v.string()
    },
    handler: async(ctx, args) => {
        const data = await ctx.db.query('teams').filter((q) => q.eq(q.field("createdBy"), args.email)).collect();
        return data;
    },
})

export const createTeam = mutation({
    args:{
        teamName: v.string(),
        createdBy: v.string()
    },
    handler: async(ctx, args) => {
        const {createdBy, teamName} = args;
        const newTeam = await ctx.db.insert('teams', {createdBy, teamName});
        return newTeam;
    },
})