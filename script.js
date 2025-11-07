function parseNumber(v) {
  if (v === null || v === undefined) return NaN;
  v = String(v).trim();
  if (v === "") return NaN;
  v = v.replace(/\./g, "").replace(/,/g, ".");
  const n = parseFloat(v);
  return isNaN(n) ? NaN : n;
}

function formatBRL(v) {
  if (!isFinite(v)) return "R$ 0,00";
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.remove("tab-active");
      b.classList.add("bg-gray-100", "text-gray-700");
    });
    btn.classList.remove("bg-gray-100", "text-gray-700");
    btn.classList.add("tab-active");
    const key = btn.getAttribute("data-tab");
    document
      .querySelectorAll(".panel")
      .forEach((p) => p.classList.add("hidden"));
    document.getElementById(key).classList.remove("hidden");
  });
});

function calcularFinanciamento() {
  const n = parseNumber(document.getElementById("numParcelas").value);
  const iPerc = parseNumber(document.getElementById("jurosMensal").value);
  const pmt = parseNumber(document.getElementById("valorParcela").value);

  const i = isFinite(iPerc) ? iPerc / 100 : NaN;

  if (!isFinite(n) || !isFinite(i) || !isFinite(pmt) || n <= 0) {
    alert(
      "Preencha corretamente Número de parcelas, Juros mensal e Valor da parcela."
    );
    return;
  }

  // PV = PMT * (1 - (1+i)^(-n)) / i
  let pv;
  if (i === 0) pv = pmt * n;
  else pv = (pmt * (1 - Math.pow(1 + i, -n))) / i;

  const total = pmt * n;
  const juros = total - pv;

  document.getElementById("valorFinanciado").textContent = formatBRL(pv);
  document.getElementById("valorTotal").textContent = formatBRL(total);
  document.getElementById("jurosPago").textContent = formatBRL(juros);
}

function limparFinanciamento() {
  document.getElementById("numParcelas").value = "";
  document.getElementById("jurosMensal").value = "";
  document.getElementById("valorParcela").value = "";
  document.getElementById("valorFinanciado").textContent = "R$ 0,00";
  document.getElementById("valorTotal").textContent = "R$ 0,00";
  document.getElementById("jurosPago").textContent = "R$ 0,00";
}

document
  .getElementById("btnCalcularFin")
  .addEventListener("click", calcularFinanciamento);
document
  .getElementById("btnLimparFin")
  .addEventListener("click", limparFinanciamento);

/* ---------- VALOR FUTURO (depósito único) ---------- */
function calcularFv() {
  const n = parseNumber(document.getElementById("fv-meses").value);
  const iPerc = parseNumber(document.getElementById("fv-juros").value);
  const pv = parseNumber(document.getElementById("fv-deposito").value);

  const i = isFinite(iPerc) ? iPerc / 100 : NaN;

  if (!isFinite(n) || !isFinite(i) || !isFinite(pv) || n < 0) {
    alert("Preencha corretamente Número de meses, Juros mensal e Depósito.");
    return;
  }

  const fv = pv * Math.pow(1 + i, n);
  document.getElementById("fv-resultado").textContent = formatBRL(fv);
}
function limparFv() {
  document.getElementById("fv-meses").value = "";
  document.getElementById("fv-juros").value = "";
  document.getElementById("fv-deposito").value = "";
  document.getElementById("fv-resultado").textContent = "R$ 0,00";
}
document.getElementById("btnCalcularFv").addEventListener("click", calcularFv);
document.getElementById("btnLimparFv").addEventListener("click", limparFv);

function calcularAnn() {
  const n = parseNumber(document.getElementById("ann-meses").value);
  const iPerc = parseNumber(document.getElementById("ann-juros").value);
  const pmt = parseNumber(document.getElementById("ann-deposito").value);

  const i = isFinite(iPerc) ? iPerc / 100 : NaN;

  if (!isFinite(n) || !isFinite(i) || !isFinite(pmt) || n < 0) {
    alert("Preencha corretamente Número de meses, Juros mensal e Depósito.");
    return;
  }

  // FV (anuidade devida) = PMT * ((1+i)^n - 1)/i * (1+i)
  let fv;
  if (i === 0) fv = pmt * n;
  else fv = pmt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);

  document.getElementById("ann-resultado").textContent = formatBRL(fv);
}
function limparAnn() {
  document.getElementById("ann-meses").value = "";
  document.getElementById("ann-juros").value = "";
  document.getElementById("ann-deposito").value = "";
  document.getElementById("ann-resultado").textContent = "R$ 0,00";
}
document
  .getElementById("btnCalcularAnn")
  .addEventListener("click", calcularAnn);
document.getElementById("btnLimparAnn").addEventListener("click", limparAnn);