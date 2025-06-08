document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const n = document.getElementById("qtd").value;
  const res = await fetch(`/lorem?p=${n}`);
  const text = await res.text();
  document.getElementById("output").innerText = text;
});
