export const rollOne = (sides=6):number => ( Math.ceil(Math.random() * sides));

export const rollMany =(dices:number, sides=6): number[]=> [...Array(dices)].map(() => rollOne(sides));

export const decorateCombatRoll = (roll:number[], boldNumber=6) => {
    // eslint-disable-next-line no-param-reassign
    return roll.map((el, index) => {
      if (el >= boldNumber) {
        return `__${el}__`;
      }
      return el;
    });
  };