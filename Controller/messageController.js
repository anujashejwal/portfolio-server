const Message = require("../Model/Message");
const nodemailer = require("nodemailer");
require("dotenv").config(); // If you're using environment variables
// @desc    Create a new message
// @route   POST /api/messages
// @access  Public
exports.createMessage = async (req, res) => {
  try {
    const { firstname, lastname, email, message } = req.body;

    // Create a new message instance
    const newMessage = new Message({
      firstname,
      lastname,
      email,
      message,
    });

    // Save the message to the database
    const savedMessage = await newMessage.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      //   port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.Google_Mail,
        pass: process.env.Google_Password,
      },
    });
    const info = await transporter.sendMail({
      from: "anujashejwal55@gmail.com", // sender address
      to: "anujashejwal55@gmail.com", // list of receivers
      subject: "New Message", // Subject line
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #333333;">New Message Notification</h2>
              <hr style="border: none; height: 1px; background-color: #eaeaea; margin-bottom: 20px;">
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <p style="color: #555555; font-size: 16px; line-height: 1.5;">
                Hi Anuja,
              </p>
              <p style="color: #555555; font-size: 16px; line-height: 1.5;">
                You have a new message from <strong>${savedMessage.firstname} ${savedMessage.lastname}</strong>:
              </p>
              <blockquote style="margin: 20px 0; padding: 15px; background-color: #f1f1f1; border-left: 4px solid #333333; color: #333333; font-size: 16px; line-height: 1.5;">
                "${savedMessage.message}"
              </blockquote>
              <p style="color: #555555; font-size: 16px; line-height: 1.5;">
                You can reply to this email to get in touch with <strong>${savedMessage.firstname} ${savedMessage.lastname}</strong>.
              </p>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #888888; font-size: 14px;">This message was sent to you from your website's contact form.</p>
            </div>
          </div>
        `,
    });

    console.log("Message sent: %s", info.messageId);

    // Send the response
    res.status(201).json({
      success: true,
      data: savedMessage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create message",
      error: error.message,
    });
  }
};

// exports.getMessages = async (req, res) => {
//     try {
//         // Retrieve all messages from the database
//         const messages = await Message.find();

//         // Send the response
//         res.status(200).json({
//             success: true,
//             data: messages
//         });W
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: 'Failed to retrieve messages',
//             error: error.message
//         });
//     }
// };
