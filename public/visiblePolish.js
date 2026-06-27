function walkText(node, replacements) {
  if (!node) return;
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.nodeValue || "";
    for (const [from, to] of replacements) text = text.split(from).join(to);
    node.nodeValue = text;
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  for (const child of Array.from(node.childNodes)) walkText(child, replacements);
}

function polishVisibleLabels() {
  const replacements = [
    ["PARALLAX LAB · MVP v0.8", "PARALLAX LAB · PUBLIC DEMO v1.0"],
    ["PARALLAX LAB · MVP v0.9", "PARALLAX LAB · PUBLIC DEMO v1.0"],
    ["v0.8 Comparison Receipts", "v1.0 Public Demo Receipts"],
    ["v0.9 Snapshot Library", "v1.0 Snapshot Library"],
    ["v0.8 CHAMBER", "v1.0 CHAMBER"],
    ["v0.9 CHAMBER", "v1.0 CHAMBER"],
    ["CodeVeil369 v0.9 Gallery", "CodeVeil369 v1.0 Gallery"],
    ["Local snapshot management overlay", "Local snapshot library"]
  ];
  walkText(document.body, replacements);
}

window.addEventListener("load", () => {
  polishVisibleLabels();
  setTimeout(polishVisibleLabels, 600);
  setTimeout(polishVisibleLabels, 1400);
});
