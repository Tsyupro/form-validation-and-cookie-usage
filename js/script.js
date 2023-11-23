// Функція для збереження кольору
function saveColor() {
    const nameInput = document.getElementById('color-name');
    const typeInput = document.getElementById('color-type');
    const codeInput = document.getElementById('color-code');
    const nameError = document.getElementById('name-error');
    const codeError = document.getElementById('code-error');
  
    // Очистка попередніх помилок
    nameError.textContent = '';
    codeError.textContent = '';
  
    // Перевірка правильності введених даних
    if (!/^[a-zA-Z]+$/.test(nameInput.value)) {
      nameError.textContent = 'Назва повинна містити тільки літери.';
      return;
    }
  
    const existingColors = getExistingColors();
    const existingColorNames = existingColors.map(color => color.name.toLowerCase());
    const lowerCaseName = nameInput.value.toLowerCase();
  
    if (existingColorNames.includes(lowerCaseName)) {
      nameError.textContent = 'Ця назва вже існує.';
      return;
    }
  
    let isValidCode = false;
  
    switch (typeInput.value) {
      case 'RGB':
        isValidCode = /^(\d{1,3},){2}\d{1,3}$/.test(codeInput.value);
        break;
      case 'RGBA':
        isValidCode = /^(\d{1,3},){3}(0(\.\d{1,2})?|1)$/.test(codeInput.value);
        break;
      case 'HEX':
        isValidCode = /^#[0-9A-Fa-f]{6}$/.test(codeInput.value);
        break;
    }
  
    if (!isValidCode) {
      codeError.textContent = 'Неправильний формат коду кольору.';
      return;
    }
  
    // Збереження кольору в Cookies
    const color = {
      name: nameInput.value,
      type: typeInput.value,
      code: codeInput.value
    };
  
    existingColors.push(color);
    setCookie('colors', JSON.stringify(existingColors), 3);
  
    // Оновлення відображення кольорів на сторінці
    updateColorList();
  }
  
  // Функція для отримання збережених кольорів з Cookies
  function getExistingColors() {
    const colorsCookie = getCookie('colors');
    return colorsCookie ? JSON.parse(colorsCookie) : [];
  }
  
  // Функція для встановлення Cookies
  function setCookie(name, value, hours) {
    const expires = new Date();
    expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
  }
  
  // Функція для отримання значення Cookies
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return '';
  }
  
  // Функція для оновлення відображення кольорів на сторінці
  function updateColorList() {
    const colorList = document.getElementById('color-list');
    colorList.innerHTML = '';
  
    const colors = getExistingColors();
    for (const color of colors) {
      const colorBlock = document.createElement('div');
      colorBlock.className = 'color-block';
      colorBlock.style.backgroundColor = color.type === 'HEX' ? color.code : `rgb(${color.code})`;
  
      const colorInfo = document.createElement('p');
      colorInfo.textContent = `Тип: ${color.type}, Назва: ${color.name}, Код: ${color.code}`;
  
      colorBlock.appendChild(colorInfo);
      colorList.appendChild(colorBlock);
    }
  }
  
  // Оновлення відображення кольорів при завантаженні сторінки
  window.onload = updateColorList;
  