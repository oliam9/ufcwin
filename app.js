import fighterData from './data.js';
import Fighter from './Fighter.js';

let opponentsArray = ['conor', 'georges', 'jones'];
let isWaiting = false;

function getNewOpponent() {
  const nextOpponentData =
    fighterData[opponentsArray.shift()];
  return nextOpponentData
    ? new Fighter(nextOpponentData)
    : {};
}

const roundEl = document.getElementById('round');

let round = 0;

//  Fight!
function fight() {
  if (!isWaiting) {
    khabib.getDiceHtml();
    opponent.getDiceHtml();
    khabib.takeDamage(opponent.currentDiceScore);
    opponent.takeDamage(khabib.currentDiceScore);

    round++;
    roundEl.textContent = `Round: ${round}`;
    render();
    if (khabib.defeated) {
      endGame();
    } else if (opponent.defeated) {
      isWaiting = true;
      if (opponentsArray.length > 0) {
        setTimeout(() => {
          opponent = getNewOpponent();
          round = 0;
          khabib.health = 65;
          render();
          isWaiting = false;
        }, 1000);
      } else {
        endGame();
      }
    }
  }
}

//  End Game
function endGame() {
  isWaiting = true;
  setTimeout(() => {
    const endMessage =
      khabib.heatlh === 0 && opponent.health === 0
        ? 'DRAW'
        : khabib.health > 0
        ? `<img class="champion" src="./images/belt.png" />`
        : 'You Lost!';

    document.body.innerHTML = `
      <div class="end-game">
        <h3>${endMessage}</h3>
        <button onclick="window.location.reload()">Fight Again!</button>
      </div> 
      `;
  }, 1000);
}

// Render
function render() {
  document.getElementById('player').innerHTML =
    khabib.getFighterHtml();

  document.getElementById('opponent').innerHTML =
    opponent.getFighterHtml();
}

document
  .getElementById('fight-button')
  .addEventListener('click', fight);

const khabib = new Fighter(fighterData.khabib);
let opponent = getNewOpponent();

render();
