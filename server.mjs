import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const port = 4173;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ts": "text/javascript; charset=utf-8",
};

function resolvePath(urlPath) {
  const safePath = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  if (safePath === "/" || safePath === "\\") {
    return join(rootDir, "public", "index.html");
  }

  return join(rootDir, safePath.replace(/^[/\\]+/, ""));
}

createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
    const filePath = resolvePath(requestUrl.pathname);
    const finalPath = existsSync(filePath) && statSync(filePath).isDirectory()
      ? join(filePath, "index.html")
      : filePath;

    if (!existsSync(finalPath)) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const ext = extname(finalPath);
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
    });

    if (ext === ".html" || ext === ".css" || ext === ".ts" || ext === ".js" || ext === ".json" || ext === ".mjs" || ext === ".svg") {
      response.end(await readFile(finalPath));
      return;
    }

    createReadStream(finalPath).pipe(response);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`Server error: ${error.message}`);
  }
}).listen(port, () => {
  console.log(`Matrix MVP is running at http://localhost:${port}`);
});
