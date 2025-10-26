// === 基本設定 ===
const DEFAULTS = {
  stonesPerPull: 160,
  stonesPerTicket: 160,
  pullsPerTen: 10,
  pullsPerPity: 80
};

// === ガチャ石計算 ===
document.getElementById("calc-btn").addEventListener("click", () => {
  const stones = parseInt(document.getElementById("stones").value, 10);
  if (isNaN(stones) || stones < 0) {
    document.getElementById("result-area").innerHTML = "正しい数値を入力してください。";
    return;
  }

  const pulls = Math.floor(stones / DEFAULTS.stonesPerPull);
  const tickets = Math.floor(stones / DEFAULTS.stonesPerTicket);
  const tens = Math.floor(pulls / DEFAULTS.pullsPerTen);
  const pityCount = Math.floor(pulls / DEFAULTS.pullsPerPity);
  const remainder = stones % DEFAULTS.stonesPerPull;
  const nextPity = DEFAULTS.stonesPerPull * DEFAULTS.pullsPerPity - (stones % (DEFAULTS.stonesPerPull * DEFAULTS.pullsPerPity));

  const html = `
    <p>単発換算：${pulls} 回</p>
    <p>10連換算：${tens} 回分</p>
    <p>チケット換算：${tickets} 枚分</p>
    <p>天井到達：${pityCount} 回</p>
    <p>次の天井まで：あと ${nextPity} 個の星玉が必要</p>
    <p>（余り：${remainder} 個）</p>
  `;
  document.getElementById("result-area").innerHTML = html;
});

// === チケットから石換算 ===
document.getElementById("convertBtn").addEventListener("click", () => {
  const ticketCount = parseInt(document.getElementById("ticketInput").value, 10);
  if (isNaN(ticketCount) || ticketCount < 0) {
    document.getElementById("ticketResultText").textContent = "正しい数値を入力してください。";
    return;
  }
  const stonePerTicket = 160; // 1枚あたりの石数
  const totalStones = ticketCount * stonePerTicket;

  document.getElementById("ticketResultText").textContent =
    `（チケット${ticketCount}枚 = ${totalStones}個分の石）`;
});

// === 光の粒エフェクト（ガチャ石クリック） ===
const icon = document.getElementById("stone-icon");
icon.addEventListener("click", (e) => {
  const rect = e.target.getBoundingClientRect();
  const sparkleCount = 8;
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    document.body.appendChild(sparkle);

    const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 50;
    const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 50;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    setTimeout(() => sparkle.remove(), 800);
  }
});
