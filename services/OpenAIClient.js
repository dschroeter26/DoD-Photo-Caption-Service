// openaiClient.js
require("dotenv").config();
const axios = require("axios");

// OpenAI Client
class OpenAIClient {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = "https://api.openai.com/v1/chat/completions"; // For GPT-4 model
  }

  async generateCaption(metadata) {
    try {
      const prompt = this.createPrompt(metadata);

      const response = await axios.post(
        this.apiUrl,
        {
          model: "gpt-3.5-turbo", // Specify GPT-4 model gpt-4o gpt-4o-mini gpt-3.5-turbo
          messages: [
            {
              role: "system",
              content:
                "You are a photo caption generator following the style of DVIDShub.net captions for military photos.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 750,
          temperature: 0.7, // Adjust creativity level
          n: 1,
          stop: null,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "OpenAI Api Response\n",
        response.data.choices[0].message.content
      );

      // Extract and return the caption text from the API response
      const caption = response.data.choices[0].message.content.trim();
      return caption;
    } catch (error) {
      console.error(
        "Error generating caption from OpenAI:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // Create a dynamic prompt based on metadata
  createPrompt(metadata) {
    const subjects = metadata.subjects
      .map((subject) => {
        return `${subject.rank} ${subject.firstName} ${subject.lastName} from the ${subject.serviceBranch} serving in the ${subject.unit} as ${subject.dutyTitle}`;
      })
      .join(", ");

    // const prompt = `Write three Department of Defense-style photo captions for an image with the following details:
    //     Subjects: ${subjects}.
    //     Action: The subjects are participating in ${metadata.action}.
    //     Location: ${metadata.location.base}, ${metadata.location.city ? metadata.location.city : ""}, ${metadata.location.state}.
    //     Date: ${metadata.date}.
    //     Photographer: ${metadata.photographer.rank} ${metadata.photographer.name}.
    //     Do not include a dateline (location and date at the start). The caption should resemble those from dvidshub.net and follow Department of Defense captioning style.`;

    const prompt = `Write three separate Department of Defense-style photo captions for an image with the following details:
        Subjects: ${subjects}.
        Action: ${metadata.action}.
        Location: ${metadata.location.base}, ${metadata.location.city ? metadata.location.city : ""}, ${metadata.location.state}.
        Date: ${metadata.date}.
        Photographer: ${metadata.photographer.rank} ${metadata.photographer.name}.
        Example Caption: ${metadata.exampleCaption ? metadata.exampleCaption : ""}.
        Do not include a dateline (location and date at the start).
        Include a second sentence giving context of the event to the reader.
        Include a photographers credit in parenthesis.
        The subjects should be listed in order as they appear in the subjects list.
        Each subject should be identified first by their serviceBranch, then their rank, then their full name, then their unit and finally by their duty title.
        The captions should resemble those from dvidshub.net and follow Department of Defense captioning style.`;

    // const prompt = `Generate three DoD-style captions:
    //       Subjects: ${subjects}.
    //       Action: ${metadata.action}.
    //       Location: ${metadata.location.base}, ${metadata.location.city ? metadata.location.city + ", " : ""}${metadata.location.state}.
    //       Date: ${metadata.date}.
    //       Photographer: ${metadata.photographer.rank} ${metadata.photographer.name}.`;
    

    // need to update this prompt to have either base or city
    //TODO: store prompts in a data base so that they can be hot swapped
    // const prompt = `Generate three DoD-style captions, include each subject's rank and duty title:
    //     Subjects: ${subjects}.
    //     Action: ${metadata.action}.
    //     Location: ${metadata.location.base}, ${metadata.location.city ? metadata.location.city + ", " : ""}${metadata.location.state}.
    //     Date: ${metadata.date}.
    //     Photographer: ${metadata.photographer.rank} ${metadata.photographer.name}.
    //     Example Caption: ${metadata.exampleCaption ? metadata.exampleCaption : ""}.`;

    console.log("Prompt", prompt);

    return prompt;
  }
}

module.exports = OpenAIClient;
