const KEY = "codeveil369.gallery.v1";
function readItems() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function writeItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}
function exportBundle(items) {
  const bundle = { schema: "codeveil369.gallery.v1", appVersion: "0.9.0", exportedAt: new Date().toISOString(), count: items.length, items };
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `codeveil369-gallery-${items.length}-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
function panelButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.border = "1px solid rgba(255,255,255,.16)";
  button.style.background = "rgba(255,255,255,.06)";
  button.style.color = "#f6dce2";
  button.style.borderRadius = "999px";
  button.style.padding = "7px 10px";
  button.style.cursor = "pointer";
  return button;
}
function mountGalleryPanel() {
  if (document.getElementById("cv369-gallery-panel")) return;
  const panel = document.createElement("section");
  panel.id = "cv369-gallery-panel";
  panel.style.position = "fixed";
  panel.style.right = "18px";
  panel.style.bottom = "18px";
  panel.style.zIndex = "9999";
  panel.style.width = "min(380px, calc(100vw - 36px))";
  panel.style.maxHeight = "60vh";
  panel.style.overflow = "auto";
  panel.style.border = "1px solid rgba(255,255,255,.12)";
  panel.style.borderRadius = "20px";
  panel.style.padding = "14px";
  panel.style.background = "rgba(8,4,8,.92)";
  panel.style.boxShadow = "0 20px 80px rgba(0,0,0,.5)";
  panel.style.color = "#f7edf2";
  panel.style.font = "13px Inter, system-ui, sans-serif";
  const title = document.createElement("div");
  title.innerHTML = `<strong>CodeVeil369 v0.9 Gallery</strong><br><span style="color:#d9bec6">Local snapshot management overlay</span>`;
  const label = document.createElement("input");
  label.placeholder = "New label / rename text";
  label.value = "Favorite Snapshot";
  label.style.width = "100%";
  label.style.margin = "10px 0";
  label.style.border = "1px solid rgba(255,255,255,.12)";
  label.style.borderRadius = "999px";
  label.style.padding = "8px 10px";
  label.style.background = "rgba(255,255,255,.06)";
  label.style.color = "#f6dce2";
  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.flexWrap = "wrap";
  row.style.gap = "8px";
  const list = document.createElement("div");
  list.style.marginTop = "10px";
  function render() {
    const items = readItems();
    list.innerHTML = items.length ? "" : `<p style="color:#d9bec6">No saved snapshots yet.</p>`;
    for (const item of items) {
      const card = document.createElement("article");
      card.style.borderTop = "1px solid rgba(255,255,255,.10)";
      card.style.padding = "10px 0";
      const name = item.label || item.snapshotHash || "snapshot";
      card.innerHTML = `<strong>${name}</strong><br><span style="color:#d9bec6">${item.snapshotHash}</span><br><span>${item.params?.mode || "mode"} · seed ${item.params?.seed || "?"}</span>`;
      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.flexWrap = "wrap";
      controls.style.gap = "6px";
      controls.style.marginTop = "8px";
      const rename = panelButton("Relabel");
      rename.onclick = () => { item.label = label.value.trim() || name; writeItems(items); render(); };
      const remove = panelButton("Remove");
      remove.onclick = () => { writeItems(items.filter((other) => other.snapshotHash !== item.snapshotHash)); render(); };
      controls.append(rename, remove);
      card.appendChild(controls);
      list.appendChild(card);
    }
  }
  const refresh = panelButton("Refresh");
  refresh.onclick = render;
  const exportBtn = panelButton("Export Bundle");
  exportBtn.onclick = () => exportBundle(readItems());
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "application/json";
  file.style.display = "none";
  file.onchange = async () => {
    const picked = file.files && file.files[0];
    if (!picked) return;
    const parsed = JSON.parse(await picked.text());
    if (parsed.schema !== "codeveil369.gallery.v1" || !Array.isArray(parsed.items)) return;
    const merged = [...parsed.items, ...readItems()].filter((item, index, arr) => arr.findIndex((other) => other.snapshotHash === item.snapshotHash) === index).slice(0, 48);
    writeItems(merged);
    file.value = "";
    render();
  };
  const importBtn = panelButton("Import Bundle");
  importBtn.onclick = () => file.click();
  const close = panelButton("Close");
  close.onclick = () => panel.remove();
  row.append(refresh, exportBtn, importBtn, close, file);
  panel.append(title, label, row, list);
  document.body.appendChild(panel);
  render();
}
window.addEventListener("load", () => setTimeout(mountGalleryPanel, 800));
