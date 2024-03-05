import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

    files: defineTable({
        archive: v.boolean(),
        createdBy: v.string(),
        document: v.string(),
        fileName: v.string(),
        teamId: v.id("teams"),
        userPicture: v.string(),
        whiteboard: v.string(),
    }),

    teams: defineTable({
        createdBy: v.string(),
        teamName: v.string(),
    }),

    users: defineTable({
        email: v.string(),
        name: v.string(),
        picture: v.string(),
    }),
});