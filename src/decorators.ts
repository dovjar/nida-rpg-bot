export const decorateCombatRoll = (roll:number[], boldNumber=6) => {
    // eslint-disable-next-line no-param-reassign
    return roll.map((el, index) => {
      if (el >= boldNumber) {
        return `__${el}__`;
      }
      return el;
    });
  };
export const decorateSocialRoll = (roll, dices = 3, diff = 4) => {
  // eslint-disable-next-line no-param-reassign
  roll = roll.map((el, index) => {
    if (index >= dices) {
      return `**${el}**`;
    }
    if (el === 6) {
      return `__${el}__`;
    }
    if (el === 1) {
      return `~~**${el}**~~`;
    }
    if (diff && el < diff) {
      return `~~${el}~~`;
    }

    return el;
  });
  return roll;
};