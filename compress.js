// compress-max.js
import fs from "fs";
import zlib from "zlib";
import path from "path";

const INPUT_FILE = path.join(process.cwd(), "silentwolf_10000.json");
const OUTPUT_FILE = path.join(process.cwd(), "silentwolf_10000.json.gz");

// Check file exists
if (!fs.existsSync(INPUT_FILE)) {
  console.error("❌ silentwolf_10000.json not found!");
  process.exit(1);
}

// Read JSON
const rawData = fs.readFileSync(INPUT_FILE, "utf8");
const data = JSON.parse(rawData);

// Find real token and repo positions
let realTokenPos = null;
let realRepoPos = null;

for (const key in data) {
  if (data[key].token === "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") realTokenPos = key;
  if (data[key].repo === "https://github.com/nk-apex/n7/archive/refs/heads/main.zip") realRepoPos = key;
}

// Create maximum compression gzip
const gzip = zlib.createGzip({ level: 9 }); // level 9 = maximum compression
const input = fs.createReadStream(INPUT_FILE);
const output = fs.createWriteStream(OUTPUT_FILE);

input.pipe(gzip).pipe(output);

output.on("finish", () => {
  const stats = fs.statSync(OUTPUT_FILE);
  console.log("✅ Maximum-compressed file created:", OUTPUT_FILE);
  console.log("Compressed size:", stats.size, "bytes");
  console.log("Real token at position:", realTokenPos);
  console.log("Real repo at position:", realRepoPos);
});

output.on("error", (err) => {
  console.error("❌ Compression failed:", err);
});