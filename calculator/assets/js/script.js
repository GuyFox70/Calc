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

  const objMathActions = {
    'add': [function (a, b) {
      return parseFloat(a) + parseFloat(b);
    }, '+'],

    'minus': [function (a, b) {
      return parseFloat(a) - parseFloat(b);
    }, '-'],

    'multiply': [function (a, b) {
      return parseFloat(a) * parseFloat(b);
    }, '*'],

    'divide': [function (a, b) {
      return parseFloat(a) / parseFloat(b);
    }, '/']
  };

  const lastActions = [];

  initCalculation();

  function initCalculation() {
    keyboard.addEventListener('click', typeDigitInput);
  }

  function typeDigitInput(e) {
    const target = e.target;
    if (target.className == 'calc__keyboard') return;

    let action = (target.getAttribute('data-sing') || target.parentElement.getAttribute('data-sing')).trim();

    if (lastActions.length > 1) lastActions.shift();

    if (action == 'ac') {

      addText(num1, '');
      addText(num2, '');

    } else if (action == 'l') {

      addText(num1, getText(num1).slice(0, -1));

    } else if (action == 'r') {

      if (getText(num1) < 0) {
        alert('This is a negative number. Square root extract only positive numbers!');
        addText(num1, '');
        return;
      }

      addText(num1, Math.sqrt(parseInt(getText(num1))));

    } else if (action == 'pow') {

      addText(num1, Math.pow(parseInt(getText(num1)), 2));

    } else if (action == 'add' || action == 'minus' || action == 'multiply' || action == 'divide') {

      lastActions.push(action);

      if (getText(num2)) {
        let fn = objMathActions[lastActions[0]][0];

        addText(num1, fn(getText(num2), getText(num1)));
        addText(num2, '');
      }

      if (action == 'minus' && getText(num1) == '') {
        addText(num1, objMathActions[action][1]);
        return;
      } else if (action != 'minus' && getText(num1) == '') {
        return;
      } else {
        addText(num2, getText(num1) + objMathActions[action][1]);
        addText(num1, '');
        addStyle([screen], 'calc__screen_padding');
      }

    } else if (action == 'equal') {

      let fn = objMathActions[lastActions[lastActions.length - 1]][0];

      addText(num1, fn(getText(num2), getText(num1)));
      addText(num2, '');

    } else {

      removeStyle([screen], 'calc__screen_padding');
      addText(num1, action, true);

    }
  }

  function getText(elem) {
    return elem.innerHTML;
  }

  function addText(elem, text, flag) {
    flag ? elem.innerHTML += text : elem.innerHTML = text;
  }

  function addStyle(arr, style) {
    arr.forEach(elem => {
      elem.classList.add(style);
    })
  }

  function removeStyle(arr, style) {
    arr.forEach(elem => {
      elem.classList.remove(style);
    })
  }

})();