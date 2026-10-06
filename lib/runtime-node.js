"use strict";

// Node 侧（Vercel Serverless / 本地 server.js）的平台依赖实现。
// Cloudflare Workers 的实现见 worker.js。
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// 路径必须是字面量：Vercel 用 @vercel/nft 静态分析 fs 调用决定打包哪些文件，
// 文件名走变量的话这些资源不会被纳入函数产物，线上会读成空字符串。
function readAsset(p) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch (err) {
    return "";
  }
}

module.exports = {
  assets: {
    ascii: readAsset(path.join(__dirname, "..", "ascii.txt")),
    indexHtml: readAsset(path.join(__dirname, "..", "index.html")),
    robotsTxt: readAsset(path.join(__dirname, "..", "robots.txt")),
    sitemapXml: readAsset(path.join(__dirname, "..", "sitemap.xml")),
  },
  env: {
    FAKE_API_KEY: process.env.FAKE_API_KEY,
  },
  randomValues: (n) => crypto.randomBytes(n),
};
