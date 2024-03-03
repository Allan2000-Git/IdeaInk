import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getFiles = query({
    args: { 
        email: v.string()
    },
    handler: async (ctx, args) => {
        const file = await ctx.db.query('files').filter((q) => q.eq(q.field('email'), args.email)).collect();
        return file;
    },
});

export const createFile = mutation({
    args:{
        fileName: v.string(),
        teamId: v.string(),
        createdBy: v.string(),
        archive: v.boolean(),
        document: v.string(),
        whiteboard: v.string(),
    },
    handler: async (ctx, args) => {
        const {fileName, teamId, createdBy, archive, document, whiteboard} = args;
        return await ctx.db.insert('files', {fileName, teamId, createdBy, archive, document, whiteboard});
    }
})