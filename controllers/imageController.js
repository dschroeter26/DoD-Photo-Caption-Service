const multer = require("multer");
const { recognizeFace } = require("../utils/FacialRecognitionApiClient");
const { captionPhoto } = require("../utils/ApPhotoCaptionClient");

// Configure multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

// Image upload and processing controller
const uploadImage = (req, res) => {
  console.log("Received request to upload image", req);

  upload(req, res, async (err) => {
    if (err) {
      console.error("Error during image upload:", err);
      return res
        .status(500)
        .json({ message: "Error uploading image", error: err });
    }

    if (!req.file) {
      console.warn("No image file provided in request");
      return res.status(400).json({ message: "No image file provided" });
    }

    console.log("Image uploaded successfully");

    try {
      // Prepare the image buffer to send to the Python backend
      console.log("Sending image to Python backend for face recognition");
      const result = await recognizeFace(req.file.buffer); // Use buffer instead of path
      console.log("Received response from Python backend:", result);

      res.json(result);
    } catch (error) {
      console.error("Error processing image:", error);
      res.status(500).json({ message: "Error processing image", error });
    }
  });
};

// generateCaption controller
// const generateCaption = async (req, res) => {
//   try {
//     const {
//       fileName,
//       contentType,
//       faces,
//       city,
//       state,
//       action,
//       context,
//       photographer,
//     } = req.body;
//     const image = req.file; // Get uploaded image

//     // Prepare form data to send to ap-caption-generator service
//     const formData = new FormData();
//     formData.append("image", fs.createReadStream(image.path));
//     formData.append("fileName", fileName);
//     formData.append("contentType", contentType);
//     formData.append("faces", faces);
//     formData.append("city", city);
//     formData.append("state", state);
//     formData.append("action", action);
//     formData.append("context", context);
//     formData.append("photographer", photographer);

//     // Send the data to the caption generation service
//     const response = await captionPhoto(formData);

//     // Forward the generated caption back to the frontend
//     res.json({ caption: response.data.caption });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error generating caption" });
//   } finally {
//     // Clean up the uploaded image file after processing
//     fs.unlinkSync(image.path);
//   }
// };

module.exports = { uploadImage };
