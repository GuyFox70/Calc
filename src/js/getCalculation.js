(() => {
  const keyboard = document.querySelector('.calc__keyboard');
  const screen = document.querySelector('.calc__screen');
  const num1 = screen.querySelector('.calc__num1');
  const num2 = screen.querySelector('.calc__num2');

  let flag = false;

  const objMathActions = {
    'add': [function (a, b) {
      return (parseFloat(a) + parseFloat(b)).toFixed(defineNumbersAfterPointForAddOrMinus([a, b]));
    }, '+'],

    'minus': [function (a, b) {
      return (parseFloat(a) - parseFloat(b)).toFixed(defineNumbersAfterPointForAddOrMinus([a, b]));
    }, '-'],

    'multiply': [function (a, b) {
      return (parseFloat(a) * parseFloat(b)).toFixed(defineNumbersAfterPointForMultiply([a, b]));
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

    if (flag && !(/[0-9\.]/g.test(action))) {

      flag = false;

    } else if (flag) {

      addText(num1, '');
      flag = false;

    }

    if ((action == 0 && getText(num1) == '0') || (action == '.' && (getText(num1) == '.' || getText(num1) == '0.'))) {
      alert('You entried wrong value!!!');
      addText(num1, '');
      return;
    };

    if (action != 0 && getText(num1) == '0' && action != '.') addText(num1, '');

    if (lastActions.length > 1) lastActions.shift();

    if (action == 'reset') {

      addText(num1, '');
      addText(num2, '');

    } else if (action == 'backspace') {

      addText(num1, getText(num1).slice(0, -1));

    } else if (action == 'sqrt') {

      if (getText(num2) || getText(num1) == '-' || getText(num1) == '.' || getText(num1).includes('^')) {

        alert('You type wrong value! Please, correct it!');
        return;

      } else if (getText(num1) == '') {

        alert('You need type some number in field!');
        return;

      }

      if (getText(num1) < 0) {

        alert('This is a negative number. Square root extract only positive numbers!');
        addText(num1, '');
        return;

      }

      addText(num1, Math.sqrt(parseFloat(getText(num1))));

    } else if (action == 'pow') {

      if (getText(num2)) return;

      if (getText(num1) == '' || getText(num1) == '-' || getText(num1) == '.') {
        alert('The first symbol, it has to be a number then degree of number!');
        return;
      }

      addText(num1, getText(num1) + '^');

    } else if (action == 'add' || action == 'minus' || action == 'multiply' || action == 'divide') {

      lastActions.push(action);

      if (getText(num2) && getText(num1)) {

        let fn = objMathActions[lastActions[0]][0];

        addText(num1, fn(getText(num2), getText(num1)));
        addText(num2, '');
      }

      if (action == 'minus' && getText(num1) == '' && getText(num2) == '') {

        addText(num1, objMathActions[action][1]);
        return;

      } else if ((action != 'minus' && getText(num1) == '') || getText(num1) == '-') {

        return;

      } else {

        if (getText(num2).slice(-1) == objMathActions[action][1] && action == 'minus') {
          addText(num1, objMathActions[action][1] + getText(num1));
          removeStyle([screen], 'calc__screen_padding');
          return;
        }

        addText(num2, getText(num1) + objMathActions[action][1]);
        addText(num1, '');
        addStyle([screen], 'calc__screen_padding');

      }

    } else if (action == 'equal') {

      if (getText(num2) == '' && !getText(num1).includes('^')) return;

      flag = true;

      if (getText(num1).includes('^')) {

        const arr = getText(num1).split('^');
        addText(num1, Math.pow(parseFloat(arr[0]), parseInt(arr[1])));

      } else {

        let fn = objMathActions[lastActions[lastActions.length - 1]][0];

        addText(num1, fn(getText(num2), getText(num1)));
        addText(num2, '');

      }

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

  function defineNumbersAfterPointForAddOrMinus(arr) {
    const result = [];

    arr.forEach(elem => {
      if (elem.includes('.')) {
        result.push(elem.split('.')[1].replace(/\D/g, '').trim().length);
      }
    });

    return result.length != 0 ? Math.max.apply(null, result) : 0;
  }

  function defineNumbersAfterPointForMultiply(arr) {
    let sum = 0;

    arr.forEach(elem => {
      if (elem.includes('.')) {
        sum += parseInt(elem.split('.')[1].replace(/\D/g, '').trim().length);
      }
    });

    return sum;
  }

})();