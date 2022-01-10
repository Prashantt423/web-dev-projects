import Routers from "express";
const router = Routers.Router();
import Message from "../models/message.js";
// ADd
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(newMessage);
  } catch (e) {
    res.status(500).json(e);
  }
});
// GET

router.get("/:messageId", async (req, res) => {
  try {
    const messages = await Message.find({
      messageId: req.params.messageId,
    });
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).json(e);
  }
});
export default router;
