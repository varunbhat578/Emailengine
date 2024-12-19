const axios = require("axios");
const { saveEmails } = require("../utils/elasticsearch");

async function syncEmails(accessToken, userId) {
  const url = "https://graph.microsoft.com/v1.0/me/messages";

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const emails = response.data.value.map((email) => ({
      id: email.id,
      subject: email.subject,
      sender: email.from.emailAddress,
      userId,
    }));

    await saveEmails(emails);
    return emails;
  } catch (error) {
    console.error("Error syncing emails:", error);
    throw error;
  }
}

module.exports = { syncEmails };
