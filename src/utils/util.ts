import moment from "moment";
import { CreateSendPacketArgs, SendPacketFormat, UserDBArgs } from "./util.interface";
import { UsersDB } from "./database";

export function createSendPacket(args: CreateSendPacketArgs): SendPacketFormat{
    const msgFormat: SendPacketFormat = {
        username: args.username || 'USER',
        message: args.data,
        time: moment().format('h:mm a'),
    }
    return msgFormat;
}


export function upsertUserConnection(args: UserDBArgs){
    // this is where the database connection happens
    const userExists = getUserById(args.id);
    if(userExists){
        UsersDB.map(user => {
            user.id === userExists.id ? user['room'] = args.room : user.room;
            return user;
        })
        return args;
    }
    UsersDB.push(args);
    return args;
}
export function getUserById(id: string): UserDBArgs | null{
    const user = UsersDB.find(user => user.id === id);
    
    return user || null;
}

export function deleteUserConnection(id: string): boolean{
    const recordIndex = UsersDB.findIndex(user => user.id = id);
    if(recordIndex === -1){
        return false;
    }
    
   UsersDB.splice(recordIndex, 1);
   return true;
}