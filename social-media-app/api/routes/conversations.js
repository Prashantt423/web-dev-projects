import Routers from "express";
const router = Routers.Router();
import Conversation from "../models/conversation.js";
// Post a conversation
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    member: [req.body.senderId, req.body.recieverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (e) {
    res.status(500).json(e);
  }
});
// Get a conversation
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      member: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (e) {
    res.status(500).json(e);
  }
});
export default router;
