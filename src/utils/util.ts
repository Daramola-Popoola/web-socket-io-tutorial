import moment from "moment";
import { CreateSendPacketArgs, SendPacketFormat } from "./util.interface";

export function createSendPacket(args: CreateSendPacketArgs): SendPacketFormat{
    const msgFormat: SendPacketFormat = {
        username: args.username || 'USER',
        message: args.data,
        time: moment().format('h:mm a'),
    }
    return msgFormat;
}