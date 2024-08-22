const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
} = require("../Controller/messageController");

// Route to create a new message
router.post("/create", createMessage);

// Route to get all messages
// router.get("/", getMessages);

module.exports = router;
