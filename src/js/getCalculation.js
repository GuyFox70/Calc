(() => {
  const keyboard = document.querySelector('.calc__keyboard');
  const input = document.querySelector('.calc__type-digit');

  initCalculation();

  function initCalculation() {
    keyboard.addEventListener('click', typeDigitInput);
    input.addEventListener('input', getExpressionInput);
  }

  function getExpressionInput() {
    console.log(input.value);
  }

  function typeDigitInput(e) {
    if (input.value == undefined) input.value = '';
    input.value =  input.value + (e.target.getAttribute('data-sing') || e.target.parentElement.getAttribute('data-sing')).trim();
  }
})();