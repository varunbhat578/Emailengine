const express = require("express");
const { syncEmails } = require("../services/syncService");
const router = express.Router();

router.post("/link-account", async (req, res) => {
  const { userId, accessToken } = req.body;

  try {
    const emails = await syncEmails(accessToken, userId);
    res
      .status(200)
      .json({ message: "Account linked and emails synced!", emails });
  } catch (error) {
    res.status(500).json({ error: "Failed to sync emails." });
  }
});

module.exports = router;
