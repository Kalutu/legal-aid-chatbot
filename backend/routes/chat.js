const router = require("express").Router();
const https = require("https");
const Message = require("../models/message.model");
const rateLimitAndAuthMiddleware = require("../middleware/rateLimitAndAuthMiddleware");

// Function to analyze sentiment
const sentimentAnalyzer = async (message) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      hostname: "chatgpt-api8.p.rapidapi.com",
      port: null,
      path: "/",
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": "chatgpt-api8.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];

      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks);
        try {
          const response = JSON.parse(body.toString());

          if (response && response.text) {
            resolve(response.text.trim());
          } else {
            resolve("No sentiment");
          }
        } catch (error) {
          console.error("Error parsing API response:", error);
          reject("No sentiment");
        }
      });
    });

    req.on("error", (e) => {
      console.error("API request error:", e);
      reject("No sentiment");
    });

    req.write(
      JSON.stringify([
        {
          content: `You are a sentiment analyzer that analyzes sentiments in messages from a system and categorizes the messages in three categories Casual, Moderate, and High Risk. You are to analyze the given message: ${message} and categorize it. You must follow the following rules: 1. You are to strictly give a single response based on the categories given that is Casual, Moderate, or High Risk do not even try to generate a sentence or your own thoughts`,
          role: "system",
        },
      ])
    );
    req.end();
  });
};

// Handle sending a message
router.post("/send", rateLimitAndAuthMiddleware, async (req, res) => {
  try {
    const context = req.body.message;
    console.log("Received message:", context);

    const sentiment = await sentimentAnalyzer(context);

    await new Message({
      sender: req.body.sender,
      message: req.body.message,
      chatId: req.body.chatId,
      recepient: "AI",
      sentiment: sentiment,
    }).save();

    const options = {
      method: "POST",
      hostname: "chatgpt-api8.p.rapidapi.com",
      port: null,
      path: "/",
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": "chatgpt-api8.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    const reqApi = https.request(options, (resApi) => {
      const chunks = [];

      resApi.on("data", (chunk) => {
        chunks.push(chunk);
      });

      resApi.on("end", async () => {
        try {
          const body = Buffer.concat(chunks);
          const response = JSON.parse(body.toString());
          console.log("API response:", response);

          if (response && response.text) {
            const result = response.text.trim();

            await new Message({
              sender: "AI",
              message: result,
              chatId: req.body.chatId,
              recepient: req.body.sender,
            }).save();

            return res.status(200).send({ data: result });
          } else if (response && response.message) {
            const result = "Please wait a moment and try again.";

            await new Message({
              sender: "AI",
              message: result,
              chatId: req.body.chatId,
              recepient: req.body.sender,
            }).save();

            return res.status(200).send({ data: result });
          } else {
            console.warn("API response missing expected keys");
            return res
              .status(500)
              .send({ message: "An error occurred generating response" });
          }
        } catch (error) {
          console.error("Error parsing API response:", error);
          return res
            .status(500)
            .send({ message: "An error occurred generating response" });
        }
      });
    });

    reqApi.on("error", (e) => {
      console.error("API request error:", e);
      return res
        .status(500)
        .send({ message: "An error occurred generating response" });
    });

    const requestBody = [
      {
        content:
          "I am a legal aid assistant that provides legal help to Kenyan people. How may I help you?",
        role: "system",
      },
      {
        content: context,
        role: "user",
      },
    ];

    console.log("Sending request body:", requestBody);

    reqApi.write(JSON.stringify(requestBody));
    reqApi.end();
  } catch (e) {
    console.error("Error:", e);
    return res
      .status(500)
      .send({ message: "An error occurred generating response" });
  }
});

// Handle getting messages
router.get("/messages/:id", rateLimitAndAuthMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const messages = await Message.find({ chatId: id });

    return res.status(200).send({ data: messages });
  } catch (e) {
    console.error("Error getting messages:", e);
    return res
      .status(500)
      .send({ message: "An error occurred getting conversation" });
  }
});

module.exports = router;
