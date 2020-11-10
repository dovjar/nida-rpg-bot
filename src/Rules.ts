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
      return (this.socialBotchNum(roll)>= roll.length/2)|| (this.socialSuccessNum(roll,effectiveness)===0);
    }
    static socialSuccessNum(roll:number[], effectiveness:number):number{
      return roll.filter((el) => el >= effectiveness).length;
    }
    static socialBotchNum(roll:number[]):number{
      return roll.filter((el) => el === 1).length;
    }
    
    


  }
