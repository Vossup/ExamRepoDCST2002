function rollDice() {
  let diceRoll = Math.floor(Math.random() * 6) + 1;
  if (diceRoll == 1) return 'one';
  if (diceRoll == 2) return 'two';
  if (diceRoll == 3) return 'three';
  if (diceRoll == 4) return 'four';
  if (diceRoll == 5) return 'five';
  return 'six';
}

export { rollDice }