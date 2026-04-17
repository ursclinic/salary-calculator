function formatNumber(num) {
  return Number(num).toLocaleString("zh-TW");
}

// 依月等效業績判斷抽成比例
function getRate(equivalentRevenue) {
  if (equivalentRevenue < 1000000) return 0;
  if (equivalentRevenue < 1500000) return 0.0025;
  if (equivalentRevenue < 2000000) return 0.005;
  if (equivalentRevenue < 2500000) return 0.0075;
  if (equivalentRevenue < 3000000) return 0.01;
  if (equivalentRevenue < 3500000) return 0.02;
  if (equivalentRevenue < 4000000) return 0.03;
  if (equivalentRevenue < 4500000) return 0.04;
  if (equivalentRevenue < 5000000) return 0.05;
  return 0.06;
}

// 依月等效業績判斷職業適合度
function getLevel(equivalentRevenue) {
  if (equivalentRevenue < 1000000) return "建議轉職";
  if (equivalentRevenue < 2500000) return "普通諮詢師";
  if (equivalentRevenue < 3500000) return "資深諮詢師";
  return "高階諮詢師";
}

document.getElementById("calcBtn").addEventListener("click", function () {
  const baseSalary = Number(document.getElementById("baseSalary").value);
  const jobAllowance = Number(document.getElementById("jobAllowance").value);
  const revenue = Number(document.getElementById("revenue").value);
  const consultDays = Number(document.getElementById("consultDays").value);
  const totalDays = Number(document.getElementById("totalDays").value);

  if (consultDays <= 0 || totalDays <= 0 || consultDays > totalDays) {
    alert("請確認諮詢天數與總上班天數是否正確");
    return;
  }

  // 原職務天數
  const originalDays = totalDays - consultDays;

  // 月等效業績
  const equivalentRevenue = (revenue / consultDays) * totalDays;

  // 原職務相關報酬依比例發放
  const actualAllowance = jobAllowance * (originalDays / totalDays);

  // 依月等效業績決定抽成比例
  const rate = getRate(equivalentRevenue);

  // 正確獎金算法：實際業績 × 抽成比例
  const bonus = revenue * rate;

  // 諮詢模式總收入
  const totalIncome = baseSalary + actualAllowance + bonus;

  // 原職務模式收入（假設整月都在原職務）
  const originalModeIncome = baseSalary + jobAllowance;

  // 差額
  const difference = totalIncome - originalModeIncome;

  // 顯示結果
  document.getElementById("originalDays").textContent =
    formatNumber(originalDays);

  document.getElementById("equivalentRevenue").textContent =
    formatNumber(Math.round(equivalentRevenue));

  document.getElementById("rate").textContent =
    (rate * 100).toFixed(2) + "%";

  document.getElementById("level").textContent =
    getLevel(equivalentRevenue);

  document.getElementById("actualAllowance").textContent =
    formatNumber(Math.round(actualAllowance));

  document.getElementById("bonus").textContent =
    formatNumber(Math.round(bonus));

  document.getElementById("totalIncome").textContent =
    formatNumber(Math.round(totalIncome));

  const diffText =
    (difference >= 0 ? "+" : "") + formatNumber(Math.round(difference));

  document.getElementById("difference").textContent = diffText;
});