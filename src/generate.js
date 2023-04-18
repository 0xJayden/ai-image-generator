const { spawn } = require("node:child_process");
const fs = require("node:fs");

// if (!fs.existsSync("./tmp")) {
//   fs.mkdirSync("./tmp");
// }

async function generateImage(prompt) {
  let id = Math.random().toString(36).substring(7);

  while (fs.existsSync(`./public/${id}.jpg`)) {
    id = Math.random().toString(36).substring(7);
  }

  const outputDir = `output/${id}`;

  await new Promise((resolve) => {
    const options = ["--model", "SD-2.1", "--outdir", outputDir, prompt];

    const cmd = spawn("imagine", options);

    cmd.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    cmd.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(true);
    });
  });

  const jpegs = fs
    .readdirSync(`./${outputDir}/generated`)
    .filter((file) => file.endsWith(".jpg"));

  const file = `./public/${id}.jpg`;
  fs.renameSync(`./${outputDir}/generated/${jpegs[0]}`, file);

  fs.rmSync(`./${outputDir}`, { recursive: true });

  return { file };
}

module.exports = { generateImage };
