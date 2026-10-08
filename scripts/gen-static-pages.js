"use strict";

// 纯静态主机（只能传文件、改不了 nginx 规则）用：把 admin.html 复制成
// login/index.html 和 admin/index.html，靠目录默认页得到无后缀地址 /login/、/admin/。
// 页面自己按 location.pathname 判断是登录页还是控制台，所以两份内容完全相同。
// 改完 admin.html 记得重新跑：npm run build:static
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "admin.html"), "utf8");

for (const dir of ["login", "admin"]) {
  const outDir = path.join(root, dir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), src);
  console.log(`[nb-ai] 已生成 ${dir}/index.html`);
}
