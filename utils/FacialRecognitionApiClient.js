const axios = require('axios');
const FormData = require('form-data');

async function recognizeFace(imageBuffer) {
  try {
    // Create a form and append the image
    const form = new FormData();
    form.append('image', imageBuffer, {
      filename: 'upload.png', // or any appropriate name
      contentType: 'image/png', // Change to your file's content type
    });

    // Send the form data to the Flask API
    const response = await axios.post('http://localhost:5001/facial-recognition', form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error calling Flask API:', error.message);
    throw error;
  }
}

module.exports = { recognizeFace, captionPhoto };
