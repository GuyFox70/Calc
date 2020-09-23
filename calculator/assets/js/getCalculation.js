(() => {
  const keyboard = document.querySelector('.calc__keyboard');
  const screen = document.querySelector('.calc__screen');
  const num1 = screen.querySelector('.calc__num1');
  const num2 = screen.querySelector('.calc__num2');
  const result = screen.querySelector('.calc__result');

  initCalculation();

  function initCalculation() {
    keyboard.addEventListener('click', typeDigitInput);
  }

  function typeDigitInput(e) {
    const target = e.target;
    if (target.className == 'calc__keyboard') return;

    let action = (target.getAttribute('data-sing') || target.parentElement.getAttribute('data-sing')).trim();

    if (action == 'ac') {
      addText(num1, '');
      addStyle([num2, result], 'hide');
    } else {
      addText(num1, action, true);
    }
  }

  function createElement(elem, parent, text = undefined, style = undefined) {
    const tag = document.createElement(elem);
    if (style) tag.classList.add(style);
    parent.appendChild(tag);
  }

  function addText(elem, text, flag) {
    flag ? elem.innerHTML += text : elem.innerHTML = text;
  }

  function addStyle(arr, style) {
    arr.forEach(elem => {
      elem.classList.add(style);
    })
  }

})();