import { Room } from "../models/rooms.js";
import BaseController from "./baseController.js";

export default class MEssageController extends BaseController {
  sendMessage = async ({ message, room, user }) => {
    
    const Foundroom = await Room.findOne({ roomId: room });

    const chatMessages = {
      message: message,
      user: user,
    };

    if (Foundroom && message !== '') {
      Foundroom.chats.push(chatMessages);

      if (user === 'employer') {
        Foundroom.employeeViewed = false
      }else {
        Foundroom.employerViewed = false
      }

      await Foundroom.save();

      let skt = this.socket.broadcast;
      skt = room ? skt.to(room) : skt;
      skt.emit("message-from-server", { message });
    }
  };
}
