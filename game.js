const emojis = ['🍎','🍌','🍇','🍓','🍑','🍍','🥝','🍉'];
let items = [...emojis, ...emojis];
items.sort(() => 0.5 - Math.random());

const grid = document.getElementById('game-grid');

items.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">${emoji}</div>
      <div class="card-back">?</div>
    </div>
  `;
  card.dataset.emoji = emoji;
  grid.appendChild(card);
});

let firstCard = null;
let lockBoard = false;

grid.addEventListener('click', function(e) {
  const clicked = e.target.closest('.card');
  if (!clicked || lockBoard || clicked.classList.contains('matched')) return;

  clicked.classList.add('flipped');

  if (!firstCard) {
    firstCard = clicked;
  } else {
    const secondCard = clicked;
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      firstCard = null;
    } else {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = null;
        lockBoard = false;
      }, 1000);
    }
  }
});
