// api/config.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "silentwolf.json.gz");

  if (!fs.existsSync(filePath)) {
    res.status(404).send("Not found");
    return;
  }

  // Tell browser / loader that it’s gzipped JSON
  res.setHeader("Content-Encoding", "gzip");
  res.setHeader("Content-Type", "application/json");

  fs.createReadStream(filePath).pipe(res);
}