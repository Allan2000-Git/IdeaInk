import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
    args: { 
        email: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).collect();
        return user;
    },
});

export const createUser = mutation({
    args:{
        name: v.string(),
        email: v.string(),
        picture: v.string()
    },
    handler: async (ctx, args) => {
        const {name, email, picture} = args;
        return await ctx.db.insert('users', {name, email, picture});
    }
})