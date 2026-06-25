#!/bin/bash
# 一键上线：把当前改动提交并推送到 GitHub，触发 GitHub Pages 重新部署
# 用法：  ./deploy.sh "这次改了什么"
set -e
cd "$(dirname "$0")"

MSG="${1:-更新页面}"

if git diff --quiet && git diff --cached --quiet; then
  echo "没有任何改动，无需上线。"
  exit 0
fi

git add -A
git commit -q -m "$MSG"
git push -q origin main
echo "✅ 已推送：$MSG"
echo "⏳ GitHub Pages 约 1 分钟后生效：https://xiaochuan201.github.io/gold-price/"
