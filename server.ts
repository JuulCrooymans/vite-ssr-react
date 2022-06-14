import fs from "fs";
import path from "path";
import express from "express";
import "dotenv/config";

async function startServer() {
  const isProd = process.env.NODE_ENV === "production";
  const app = express();
  let vite: any;

  if (isProd) {
    // Production
    app.use(express.static("./client"));
  } else {
    const { createServer } = await import("vite");
    vite = await createServer({
      server: { middlewareMode: "ssr" },
    });
    app.use(vite.middlewares);
  }

  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      let template;
      let render;

      if (isProd) {
        template = fs.readFileSync(
          path.resolve(__dirname, "./client/index.html"),
          "utf-8"
        );
        // @ts-ignore
        render = (await import("./server/entry-server.js")).render;
      } else {
        template = fs.readFileSync(path.resolve("index.html"), "utf8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("./src/entry-server.tsx")).render;
      }

      const appHtml = await render(url);
      const html = template.replace("<!--ssr-outlet-->", appHtml);

      res.status(200).set({ "Content-type": "text/html" }).end(html);
    } catch (err) {
      !isProd && vite.ssrFixStacktrace(err);
      next(err);
    }
  });

  app.listen(process.env.PORT || 3000);
}

startServer();
