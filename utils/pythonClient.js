// utils/pythonClient.js
const { spawn } = require("child_process");

const recognizeFace = async (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", ["facial_recognition_api.py"]);

    pythonProcess.stdin.write(imageBuffer);
    pythonProcess.stdin.end();

    let data = "";

    pythonProcess.stdout.on("data", (chunk) => {
      data += chunk;
    });

    pythonProcess.stderr.on("data", (error) => {
      console.error("Python error:", error.toString());
      reject(error.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return reject(`Python process exited with code ${code}`);
      }
      resolve(JSON.parse(data));
    });
  });
};

module.exports = { recognizeFace };
