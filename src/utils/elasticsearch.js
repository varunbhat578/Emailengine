const { Client } = require("@elastic/elasticsearch");

const client = new Client({ node: process.env.ELASTICSEARCH_URL });

async function saveEmails(emails) {
  const body = emails.flatMap((doc) => [{ index: { _index: "emails" } }, doc]);
  await client.bulk({ refresh: true, body });
}

module.exports = { saveEmails };
