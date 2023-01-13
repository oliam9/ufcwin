import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentage,
} from './utils.js';

class Fighter {
  constructor(data) {
    Object.assign(this, data);

    this.maxHealth = this.health;

    this.diceArray = getDicePlaceholderHtml(this.diceCount);
  }

  getDiceHtml() {
    this.currentDiceScore = getDiceRollArray(
      this.diceCount
    );

    this.diceArray = this.currentDiceScore
      .map((num) => {
        return `<div class="dice">${num}</div>`;
      })
      .join('');
  }

  takeDamage(attackScoreArray) {
    const totalAttackScore = attackScoreArray.reduce(
      (total, num) => {
        return total + num;
      }
    );

    this.health -= totalAttackScore;

    if (this.health <= 0) {
      this.defeated = true;
      this.health = 0;
    }
  }

  getHealthBarHtml() {
    const percent = getPercentage(
      this.health,
      this.maxHealth
    );

    return `
        <div class="health-bar-outer">
            <div class="health-bar-inner ${
              percent < 26 ? 'danger' : ''
            } " 
                style="width: ${percent}%;">
            </div>
        </div>
    `;
  }

  getFighterHtml() {
    const {
      elementId,
      name,
      avatar,
      health,
      diceCount,
      diceArray,
    } = this;
    const healthBar = this.getHealthBarHtml();

    return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${diceArray}
                </div>
            </div>`;
  }
}

export default Fighter;
