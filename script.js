document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".card-container");
  fetch("./projects.json")
    .then((r) => (r.ok ? r.json() : Promise.reject("projects.json not found")))
    .then((list) => {
      list.forEach((p) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h2 class="title">${escapeHtml(p.name)}</h2>
          <a class="btn" href="${escapeAttr(
            p.url
          )}" target="_blank" rel="noopener noreferrer">View Live</a>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error(err);
      container.innerHTML =
        '<p style="color:#faa">Failed to load projects.</p>';
    });

  function escapeHtml(s) {
    return String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[c])
    );
  }
  function escapeAttr(s) {
    return escapeHtml(s);
  }
});
