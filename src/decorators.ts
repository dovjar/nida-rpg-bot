export const decorateCombatRoll = (roll:number[], boldNumber=6) => {
    // eslint-disable-next-line no-param-reassign
    return roll.map((el, index) => {
      if (el >= boldNumber) {
        return `__${el}__`;
      }
      return el;
    });
  };
export const decorateSocialRoll = (roll, dices = 3, diff = 4, sides=6) => {
  // eslint-disable-next-line no-param-reassign
  roll = roll.map((el, index) => {
    if (index >= dices) {
      return `**${el}**`;
    }
    if (el === sides) {
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
export const decorateSocialRollAfterLuck = (roll:string[], dices = 3, diff = 4, sides=6) => {
  // eslint-disable-next-line no-param-reassign
  const orgLength =dices + roll.filter(t=>t==='?').length;
  roll = roll.map((el, index) => {
    if (index >= orgLength) {
      return `**${el}**`;
    }
    const n=parseInt(el,10);
    if(!n)
      return el;
    if (n === sides) {
      return `__${el}__`;
    }
    if (n === 1) {
      return `~~**${el}**~~`;
    }
    if (diff && n < diff) {
      return `~~${el}~~`;
    }

    return el;
  });
  return roll;
};

export const decorateDamageRoll = (roll:number[], ln:number) => roll.map((el) => {
  if (el > (6 - ln)) {
    return `**${el}**`;
  }
  return `~~${el}~~`;
});