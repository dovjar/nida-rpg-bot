export const decorateCombatRoll = (roll:number[], boldNumber=6) => {
    // eslint-disable-next-line no-param-reassign
    return roll.map((el, index) => {
      if (el >= boldNumber) {
        return `__${el}__`;
      }
      return el;
    });
  };