(() => {
  const keyboard = document.querySelector('.calc__keyboard');
  const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  for (let i = 0; i <= 9; i++) {
    const p = document.createElement('p');
    p.classList.add('calc__number');
    p.id = `n_${i}`;
    p.setAttribute('data-sing', i);
    p.style.gridArea = numbers[i];

    const span = document.createElement('span');
    span.innerHTML = i;

    p.appendChild(span);
    keyboard.appendChild(p);

  }
})();;
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
    // if (input.value == undefined) input.value = '';

    num1.innerHTML += action;
  }

  function createElement(elem, parent, text = undefined, style = undefined) {
    const tag = document.createElement(elem);
    if (style) tag.classList.add(style);
    parent.appendChild(tag);
  }

})();