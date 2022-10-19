import express from "express";
import { getMyChats, getChats } from "../controllers/chatController.js";
import { isEmployer, isOwner, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/myChats/:userId").get(getMyChats);
router.route("/chats/:roomId").get(getChats);

export default router;
