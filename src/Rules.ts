export enum SubLocationEnum{
  RandomHead=1,RandomBody=2, RandomLeftArm=3, RandomRightArm=4, RandomLeftLeg=5, RandomRightLeg=6,
  HeadScull=11, HeadFace=13,HeadNeck=15, HeadEye=16,
  BodyFlesh =21,BodyVital=25,
  ArmFlesh = 31, ArmJoint = 36,
  LegFlesh = 41, LegJoint = 45

}
export enum LocationEnum{
  head=1,body=2, arm=3, leg=4, random=0
}

export enum DamageEffectEnum{
  T='T',
  B='B',
  C='C'
}

export class Rules {
    static socialIsBotch(roll:number[], effectiveness:number){
      return this.socialBotchNum(roll)>=this.socialSuccessNum(roll,effectiveness);
    }
    static socialSuccessNum(roll:number[], effectiveness:number):number{
      return roll.filter((el) => el >= effectiveness).length;
    }
    static socialBotchNum(roll:number[]):number{
      return roll.filter((el) => el === 1).length;
    }
    static getLocation=(loc:LocationEnum, roll:number)=>{
      return SubLocationEnum[roll+ loc *10 ]  ||
             SubLocationEnum[roll-1+ loc *10 ] ||
             SubLocationEnum[roll-2+ loc *10 ] ||
             SubLocationEnum[roll-3+ loc *10 ] ||
             SubLocationEnum[roll-4+ loc *10 ] ||
             SubLocationEnum[roll-5+ loc *10 ];
    }
    static getLocationEffect=(loc:string):string=>{
      switch(loc){
        case 'HeadFace':
          return '+1B';
        case 'HeadNeck':
          return '+2B';
        case 'HeadEye':
          return '+2C this is usually unarmored';
        case 'BodyVital':
          return '+2C';
        case 'ArmJoint':
          return '+2T and 4-6 to drop weapon';
        case 'LegJoint':
          return '+2T and 3-4 kneels or is off-balance, 5-6 falls down';
        case 'BodyFlesh':
        case 'ArmFlesh':
        case 'LegFlesh':
        case 'HeadScull':
          return '+1T';
        default:
          return null;
      }
    }



  }
