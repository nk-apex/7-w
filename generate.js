// generate-10000.js
import fs from "fs";

// === CONFIG ===
const TOTAL_ENTRIES = 10000;
const OUTPUT_FILE = "silentwolf_10000.json";

// Fake token generator
function randomToken() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "ghp_";
  for (let i = 0; i < 36; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

// Fake GitHub repo generator
function randomRepo() {
  const users = ["alphadev", "quantlabs", "gridworks", "cyberstack", "datapulse", "vectorlabs", "netfusion"];
  const projects = ["engine", "service", "pipeline", "framework", "module", "router", "runtime"];
  const randomUser = users[Math.floor(Math.random() * users.length)];
  const randomProject = projects[Math.floor(Math.random() * projects.length)];
  const randomNum = Math.floor(Math.random() * 10000);
  return `https://github.com/${randomUser}/${randomProject}-${randomNum}/archive/refs/heads/main.zip`;
}

// === Positions ===
const realTokenPosition = Math.floor(Math.random() * TOTAL_ENTRIES);
let realRepoPosition;
do {
  realRepoPosition = Math.floor(Math.random() * TOTAL_ENTRIES);
} while (realRepoPosition === realTokenPosition); // make sure it's different

// Real token and repo (your actual values)
const REAL_TOKEN = "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";
const REAL_REPO = "https://github.com/nk-apex/n7/archive/refs/heads/main.zip";

// === Generate JSON ===
const data = {};

for (let i = 0; i < TOTAL_ENTRIES; i++) {
  let token = randomToken();
  let repo = randomRepo();

  // Insert real token and repo in their specific positions
  if (i === realTokenPosition) token = REAL_TOKEN;
  if (i === realRepoPosition) repo = REAL_REPO;

  data[i] = { token, repo };
}

// === Save to file ===
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
console.log(`✅ Generated ${OUTPUT_FILE} with ${TOTAL_ENTRIES} entries`);
console.log(`Real token at position: ${realTokenPosition}`);
console.log(`Real repo at position: ${realRepoPosition}`);