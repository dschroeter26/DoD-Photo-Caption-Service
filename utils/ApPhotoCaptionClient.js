const axios = require("axios");
const FormData = require("form-data");

async function captionPhoto(imageBuffer, imageData) {
  try {
    // Create a form and append the image
    const form = new FormData();
    form.append("image", imageBuffer, {
      filename: imageData.filename, // or any appropriate name
      contentType: imageData.contentType, // Change to your file's content type
    });
    form.append("faces", imageData.faces);
    form.append("city", imageData.city);
    form.append("state", imageData.state);
    form.append("action", imageData.action);
    form.append("context", imageData.context);
    form.append("photographer", imageData.photographer);

    // Send the form data to the Flask API
    const response = await axios.post(
      "http://localhost:5005/generate-caption",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    throw error;
  }
}

module.exports = { captionPhoto };
