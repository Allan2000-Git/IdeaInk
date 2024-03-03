export type KindeUser = {
    email: String | null,
    given_name:String  | null,
    family_name:String  | null,
    picture:String  | null,
    _creationTime:Number,
    _id: String,
}

export type Team = {
    createdBy: String  | null,
    teamName:String  | null,
    _creationTime:Number  | null,
    _id: String  | null,
}