var contentEl = document.getElementById("content");

// --- Навігація ---
document.getElementById("nav-home").addEventListener("click", function (e) {
  e.preventDefault();
  showHome();
});

document.getElementById("nav-catalog").addEventListener("click", function (e) {
  e.preventDefault();
  loadCatalog();
});

// --- Головна сторінка ---
function showHome() {
  contentEl.innerHTML = `
    <div id="home-section">
      <h1>BY MAX — Clothing Store</h1>
      <p>Welcome to our online clothing catalog. Browse categories or check out our Specials!</p>
      <button class="category-link" onclick="loadCatalog()">View Catalog</button>
    </div>
  `;
}

// --- Завантаження каталогу ---
function loadCatalog() {
  fetch("data/categories.json")
    .then(function (r) { return r.json(); })
    .then(function (categories) {
      var links = categories.map(function (cat) {
        return `<span class="category-link" onclick="loadCategory('${cat.shortname}')">${cat.name}</span>`;
      }).join("");

      links += `<span class="category-link specials-link" onclick="loadSpecials()">⭐ Specials</span>`;

      contentEl.innerHTML = `
        <div id="catalog-section">
          <h2>Catalog</h2>
          <div class="category-list">${links}</div>
        </div>
      `;
    });
}

// --- Завантаження категорії ---
function loadCategory(shortname) {
  fetch("data/" + shortname + ".json")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var cards = data.items.map(function (item) {
        return `
          <div class="item-card">
            <img src="https://placehold.co/200x160?text=${encodeURIComponent(item.shortname)}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">${item.price} ₴</span>
          </div>
        `;
      }).join("");

      contentEl.innerHTML = `
        <div id="items-section">
          <h2>${data.category}</h2>
          <div class="items-grid">${cards}</div>
        </div>
      `;
    });
}

// --- Specials — випадкова категорія ---
function loadSpecials() {
  fetch("data/categories.json")
    .then(function (r) { return r.json(); })
    .then(function (categories) {
      var random = categories[Math.floor(Math.random() * categories.length)];
      loadCategory(random.shortname);
    });
}

// Запуск
showHome();
