const OpenAIClient = require("./../services/OpenAIClient");

// Instantiate OpenAI Client
const openAIClient = new OpenAIClient();

const generateCaption = async (req, res) => {
  try {
    console.log("Received request", req.body);
    const metadata = req.body; // Expect metadata in the request body
    const caption = await openAIClient.generateCaption(metadata);
    res.status(200).json({ caption });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate caption." });
  }
};

module.exports = { generateCaption };
