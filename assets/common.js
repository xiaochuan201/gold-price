// ===== 百宝箱 · 共享工具函数 =====

// 数字格式化：千分位 + 固定小数位
function fmt(n, d = 2) {
  return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
}

// 不走缓存的 GET 请求，返回解析后的 JSON
async function jget(url) {
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
}

// 给一个按钮加「点击后转一圈 + N 秒冷却倒计时」的行为
// 用法：const refresh = makeCooldownButton('refreshBtn', load, 5)
function makeCooldownButton(btnId, action, seconds = 5) {
  const btn = document.getElementById(btnId);
  let cooling = false;
  btn.addEventListener('click', () => {
    if (cooling) return;
    // 转一圈动画（每次点击重新触发）
    btn.classList.remove('spin'); void btn.offsetWidth; btn.classList.add('spin');
    setTimeout(() => btn.classList.remove('spin'), 600);
    action();
    // 冷却倒计时
    cooling = true; btn.disabled = true; btn.classList.add('cooling');
    let left = seconds; btn.textContent = left;
    const timer = setInterval(() => {
      if (--left <= 0) {
        clearInterval(timer);
        cooling = false; btn.disabled = false;
        btn.classList.remove('cooling'); btn.textContent = '↻';
      } else { btn.textContent = left; }
    }, 1000);
  });
  return btn;
}
