const router = require("express").Router();
let rateLimitAndAuthMiddleware = require("../middleware/rateLimitAndAuthMiddleware");
const { User } = require("../models/user.model");
const Report = require("../models/report.model");
const Message = require("../models/message.model");

const mongoose = require("mongoose");
const moment = require("moment");

function generateDateRange(startDate, endDate) {
  const dateRange = [];
  let currentDate = moment(startDate);

  while (currentDate.isSameOrBefore(endDate)) {
    dateRange.push(moment(currentDate));
    currentDate.add(1, "day");
  }

  return dateRange;
}

router.post("/report", rateLimitAndAuthMiddleware, async (req, res) => {
  try {
    await new Report({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      incident: req.body.incident,
      gender: req.body.gender,
      phonenumber: req.body.phonenumber,
    }).save();
    return res.status(200).send({
      message: "Case Reported",
    });
  } catch (error) {
    if (error && error._message) {
      return res.status(500).send({ message: error._message });
    }
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
router.get("/reports", rateLimitAndAuthMiddleware, async (req, res) => {
  try {
    const currentDate = new Date(); // Current date
    const thirtyDaysAgo = new Date(currentDate);
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);

    // Retrieve and filter reports
    const reports = await Report.find({
      createdAt: { $gte: thirtyDaysAgo, $lte: currentDate },
    });

    // Retrieve and filter users
    const users = await User.find({
      createdAt: { $gte: thirtyDaysAgo, $lte: currentDate },
    });

    // Find messages within the date range
    const messages = await Message.find({
      createdAt: { $gte: thirtyDaysAgo, $lte: currentDate },
    });
    const endDate = moment().startOf("day");
    const startDate = moment().subtract(30, "days").startOf("day");
    const dateRange = generateDateRange(startDate, endDate);

    // Array to store daily statistics
    const dailyStats = [];

    // Loop through each day in the month
    for (const date of dateRange) {
      const nextDay = moment(date).endOf("day");

      // Retrieve and count reports for the day
      const reportCount = await Report.countDocuments({
        createdAt: { $gte: date, $lte: nextDay },
      });

      // Retrieve and count users created for the day
      const userCount = await User.countDocuments({
        createAt: { $gte: date, $lte: nextDay },
      });

      // Retrieve and count messages for the day
      const messageCount = await Message.countDocuments({
        createdAt: { $gte: date, $lte: nextDay },
      });

      // Push daily statistics to the array
      dailyStats.push({
        date: date.format("MMM D"),
        reportCount: reportCount,
        userCount: userCount,
        messageCount: messageCount,
      });
    }

    // Aggregate messages per sentiment category
    const result = await Message.aggregate([
      {
        $match: {
          recepient: "AI",
          createdAt: {
            $gte: thirtyDaysAgo,
            $lte: currentDate,
          },
          sentiment: {
            $in: ["High Risk", "Casual", "Moderate"],
          },
        },
      },
      {
        $group: {
          _id: "$sentiment",
          count: { $sum: 1 },
        },
      },
    ]);

    // Calculate the total number of messages
    const totalMessages = messages.length;

    // Calculate the percentage for each category
    const messagesData = result.map((category) => ({
      sentiment: category._id,
      count: category.count,
      percentage: (category.count / totalMessages) * 100,
    }));

    const resultArray = {
      incidents: reports,
      users: users,
      totalMessages: totalMessages,
      messagesData: messagesData,
      dailyStats: dailyStats,
    };

    return res.status(200).send({ data: resultArray });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
