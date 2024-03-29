import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getFiles = query({
    args: { 
        teamId: v.any()
    },
    handler: async (ctx, args) => {
        const file = await ctx.db.query('files').filter((q) => q.eq(q.field('teamId'), args.teamId)).order("desc").collect();
        return file;
    },
});

export const getFile = query({
    args: { 
        _id: v.id('files')
    },
    handler: async (ctx, args) => {
        const file = await ctx.db.get(args._id);
        return file;
    },
});

export const createFile = mutation({
    args:{
        fileName: v.string(),
        teamId: v.any(),
        createdBy: v.string(),
        archive: v.boolean(),
        document: v.string(),
        whiteboard: v.string(),
        userPicture: v.string()
    },
    handler: async (ctx, args) => {
        const {fileName, teamId, createdBy, archive, document, whiteboard, userPicture} = args;
        const newFile = await ctx.db.insert('files', {fileName, teamId, createdBy, archive, document, whiteboard, userPicture});
        return newFile;
    }
})

export const updateDocument = mutation({
    args:{
        _id: v.id('files'),
        document: v.string(),
    },
    handler: async (ctx, args) => {
        const {_id, document} = args;
        const updatedDocument = await ctx.db.patch(args._id, {document});
        return updatedDocument;
    }
})

export const updateWhiteboard = mutation({
    args:{
        _id: v.id('files'),
        whiteboard: v.string(),
    },
    handler: async (ctx, args) => {
        const {_id, whiteboard} = args;
        const updatedDocument = await ctx.db.patch(args._id, {whiteboard});
        return updatedDocument;
    }
})

export const deleteFile = mutation({
    args:{
        fileId: v.id('files'),
    },
    handler: async (ctx, args) => {
        const {fileId} = args;
        const deletedFile = await ctx.db.delete(fileId);
        return deletedFile;
    }
})

export const archiveFile = mutation({
    args:{
        fileId: v.id('files'),
        archive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const {fileId, archive} = args;
        const archivedFile = await ctx.db.patch(fileId, {archive});
        return archivedFile;
    }
})