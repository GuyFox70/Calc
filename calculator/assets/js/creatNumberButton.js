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
})();