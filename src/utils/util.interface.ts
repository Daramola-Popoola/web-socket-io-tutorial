export interface CreateSendPacketArgs {
    username?: string;
    data: any;
}

export interface SendPacketFormat {
    username: string;
    message: any;
    time: string;
}

export interface UserDBArgs {
    id: string;
    username: string;
    room: string;
}