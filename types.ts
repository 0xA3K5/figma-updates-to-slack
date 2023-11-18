interface IUser {
    handle: string;
    image: string;
    id: string;
}

export interface IVersion {
    id: string,
    created_at: string,
    label: string;
    description: string;
    user: IUser,
    thumbnail_url: string;
}
