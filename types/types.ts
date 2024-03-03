export type KindeUser = {
    email: string | null,
    given_name:string | null,
    family_name:string | null,
    picture:string | null,
    _creationTime:number,
    _id: string,
}

export type Team = {
    createdBy: string | null,
    teamName:string | null,
    _creationTime:number,
    _id: string,
}