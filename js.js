// ========== HTML-структура ==========
const h1 = document.createElement('h1');
h1.textContent = "SnapCar";
document.body.appendChild(h1);

const nav = document.createElement('div');
nav.id = 'nav';
document.body.appendChild(nav);

const content = document.createElement('div');
content.id = 'content';
document.body.appendChild(content);

// ========== Страницы ==========
const pages = {
  home: {
    title: 'Welcome!',
    text: ` 
    <div class="glass-block">
    <h2>Update!</h2>
    <p>We have recently updated our website to improve user experience and navigation. A brand-new <strong>Exhibition</strong> page has been added to showcase our curated collections. This page allows visitors to filter and explore exhibitions with ease. We invite you to explore the new features and enjoy the enhanced content.</p>
    </div>
    <h3>Hello! Welcome to Snapcar — a site with real car photos from a unique private collection.</h3>
      <hr>
      <blockquote class="quote">“Every car has a story. Every photo captures a piece of history.”</blockquote>
      <br>
      <div class="glass-block">
        <h2>Warning!</h2>
        <p>We kindly ask you not to use these photos without our permission.
        These images are part of a private collection. If you'd like to request permission, feel free to <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRrlQspWhDcbFTmnSMkbRHwJcQjSZBXFrxRCBfRFxdbTBVNVPVJBCKDjDswnhvHsxPBHWmG">contact us</a>.</p>
      </div>
      <br>` 
  },
  gallery: {
    title: 'Gallery',
    text: ''
  },
  exhibition: {
    title: 'Exhibition',
    text: ''
  },
  about: {
    title: 'About',
    text: `<p>Hello! I'm Michael, 13 years old, and I created this site to show my little brother's growing car photo collection.</p>
      <p>These cars aren’t just metal and wheels — they represent moments, feelings, even dreams. That’s why we made this site: to honor a hobby, share a bit of our world, and inspire others to notice the beauty in the ordinary.</p>
      <blockquote class="quote">“Every car has a story. Every photo is a piece of history.”</blockquote>` 
  },
};

// ========== Навигация ==========
for (let key in pages) {
  const btn = document.createElement('button');
  btn.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  btn.className = 'nav-btn';
  btn.onclick = () => showPage(key);
  nav.appendChild(btn);
}

// ========== Функция показа страницы ==========
function showPage(page) {
  content.innerHTML = '';

  const h2 = document.createElement('h2');
  h2.textContent = pages[page].title;
  content.appendChild(h2);

  const div = document.createElement('div');
  div.innerHTML = pages[page].text;
  content.appendChild(div);

  // === Выставки ===
  if (page === 'exhibition') {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin: 20px auto;
    `;
    content.appendChild(buttonContainer);

    const viewContainer = document.createElement('div');
    content.appendChild(viewContainer);

    function styleExhibitionButton(btn) {
      btn.style.cssText = `
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        background: linear-gradient(to right, #00bfff, #00c6ff);
        border: none;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 191, 255, 0.3);
        margin: 10px 5px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      `;
      btn.onmouseenter = () => {
        btn.style.transform = 'scale(1.05)';
        btn.style.boxShadow = '0 6px 18px rgba(0, 191, 255, 0.4)';
      };
      btn.onmouseleave = () => {
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = '0 4px 12px rgba(0, 191, 255, 0.3)';
      };
    }

    function showExhibitionYearButtons() {
      buttonContainer.innerHTML = '';
      viewContainer.innerHTML = '';

      const combos = [...new Set(cards.map(c => `${c.exhibition}|||${c.datum}`))];

      combos.forEach(pair => {
        const [exhi, year] = pair.split('|||');
        const card = cards.find(c => c.exhibition === exhi && c.datum === year);

        const div = document.createElement('div');
        div.style.cssText = `
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 280px;
          background: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          padding: 10px;
          transition: transform 0.2s;
        `;
        div.onmouseenter = () => div.style.transform = 'scale(1.03)';
        div.onmouseleave = () => div.style.transform = 'scale(1)';

        const img = document.createElement('img');
        img.src = card.image;
        img.alt = `${exhi} ${year}`;
        img.style.cssText = `
          width: 260px;
          height: 160px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 10px;
        `;
        div.appendChild(img);

        const btn = document.createElement('button');
        btn.textContent = `${exhi} ${year}`;
        styleExhibitionButton(btn);
        btn.style.width = '100%';
        btn.onclick = () => showPhotosByYear(exhi, year);
        div.appendChild(btn);

        buttonContainer.appendChild(div);
      });
    }

    function showPhotosByYear(exhi, year) {
      buttonContainer.innerHTML = '';
      viewContainer.innerHTML = '';

      const title = document.createElement('h2');
      title.textContent = `${exhi} — ${year}`;
      title.style.textAlign = 'center';
      title.style.marginBottom = '15px';
      viewContainer.appendChild(title);

      const back = document.createElement('button');
      back.textContent = 'Back';
      styleExhibitionButton(back);
      back.onclick = showExhibitionYearButtons;
      viewContainer.appendChild(back);

      const gallery = document.createElement('div');
      gallery.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        padding: 20px 0;
      `;
      viewContainer.appendChild(gallery);

      cards
        .filter(c => c.exhibition === exhi && c.datum === year)
        .forEach(c => {
          const d = document.createElement('div');
          d.style.cssText = `
            padding: 10px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s;
          `;
          d.onmouseenter = () => d.style.transform = 'scale(1.03)';
          d.onmouseleave = () => d.style.transform = 'scale(1)';

          const i = document.createElement('img');
          i.src = c.image;
          i.alt = `${exhi} photo`;
          i.style.cssText = `
            width: 250px;
            height: 160px;
            object-fit: cover;
            border-radius: 6px;
          `;
          d.appendChild(i);
          gallery.appendChild(d);
        });
    }

    showExhibitionYearButtons();
  }

  // === Галерея ===
  if (page === 'gallery') {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search cars...';
    searchInput.style.cssText = `
      padding: 12px 16px;
      margin: 20px auto;
      width: 260px;
      display: block;
      font-size: 16px;
      border-radius: 20px;
      border: 1px solid #ccc;
    `;
    content.appendChild(searchInput);

    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'gallery-container';
    content.appendChild(galleryContainer);

    const brandSelect = document.createElement('select');
    brandSelect.style.cssText = `
      margin: 20px auto;
      display: block;
      padding: 10px;
      font-size: 16px;
      border-radius: 10px;
      border: 1px solid #ccc;
      max-width: 300px;
    `;
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Filter by brand';
    defaultOption.value = '';
    brandSelect.appendChild(defaultOption);

    const brands = [...new Set(cars.map(c => c.brand))];
    brands.forEach(brand => {
      const option = document.createElement('option');
      option.textContent = brand;
      option.value = brand;
      brandSelect.appendChild(option);
    });
    content.insertBefore(brandSelect, galleryContainer);

    function renderCardsSortedByBrand(filter = '') {
      galleryContainer.innerHTML = '';
      const selectedBrand = brandSelect.value;

      const filteredCars = cars.filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(filter.toLowerCase());
        const matchesBrand = !selectedBrand || car.brand === selectedBrand;
        return matchesSearch && matchesBrand;
      });

      const cardRow = document.createElement('div');
      cardRow.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
      `;
      galleryContainer.appendChild(cardRow);

      filteredCars
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(car => {
          const card = document.createElement('div');
          card.className = 'div1';
          card.id = car.name;
          card.style.cssText = `
            width: 250px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            cursor: pointer;
            padding: 10px;
            transition: transform 0.2s;
          `;
          card.onmouseenter = () => card.style.transform = 'scale(1.03)';
          card.onmouseleave = () => card.style.transform = 'scale(1)';

          const title = document.createElement('h2');
          title.textContent = car.name;
          title.style.margin = '10px 0';

          const img = document.createElement('img');
          img.src = car.image;
          img.alt = car.name;
          img.style.cssText = 'width: 100%; height: 160px; object-fit: cover; border-radius: 6px;';

          card.appendChild(title);
          card.appendChild(img);
          card.onclick = () => showCarDetails(car);

          cardRow.appendChild(card);
        });
    }

    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase().trim();
      renderCardsSortedByBrand(filter);
    });

    brandSelect.addEventListener('change', () => {
      const filter = searchInput.value.toLowerCase().trim();
      renderCardsSortedByBrand(filter);
    });

    renderCardsSortedByBrand();
  }
}

// ========== Детали машины ==========
function showCarDetails(car) {
  pages.details = {
    title: car.name,
    text: `
      <div class="car-details">
        <img src="${car.image}" alt="${car.name}" style="max-width: 300px; border-radius: 10px;" />
        <h3>${car.name}</h3>
        <p>${car.details}</p>
        <button class="nav-btn" onclick="showPage('gallery')">← Back to Gallery</button>
      </div>
    `
  };
  showPage('details');
}

// ========== Запуск ==========
showPage('home');
