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
    _id: any,
}

export type File = {
    archive: boolean | null,
    createdBy: string | null,
    document: string | null,
    fileName:string | null,
    teamId:any,
    whiteboard:string | null,
    _creationTime:number,
    _id: any,
}