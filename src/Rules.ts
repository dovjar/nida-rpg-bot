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
    static meleeFortune17 = {
      1: 'Victim loses weapon',
      2: '+2 Luck',
      3: '+2 Dmg',
      4: 'Gain Extra attack for free and +1 Luck',
      5: 'Blow does Max Dmg Effects',
      6: 'Blow does Double Dmg Effects',
    }

    static meleeFortune18 = {
      1: 'Victim falls down',
      2: '+3 Luck',
      3: '+3 Dmg',
      4: 'Gain Extra attack for free and +3 Luck',
      5: 'Blow does Double Dmg Effects',
      6: 'Blow does Triple Dmg Effects',
    }

    static rangedFortune17 = {
      1: 'Bypass Armor',
      2: '+2 Luck',
      3: 'Restore 2d Vigor',
      4: 'Bypass Armor and +2 Dmg',
      5: 'Attack does Max Dmg Effects',
      6: 'Attack does Double Dmg Effects',
    }

    static rangedFortune18 = {
      1: 'Bypass Armor and +1 Dmg',
      2: '+3 Luck',
      3: 'Restore 3d Vigor',
      4: 'Bypass Armor and +3 Dmg',
      5: 'Attack does Double Dmg Effects',
      6: 'Attack does Triple dmg Effects',
    }

    static meleeMisfortune3 = {
      1: '2 Armor pieces breaks, -1 Armor until fixed, if you don’t have armor -2 to all actions for next Turn',
      2: 'Lose balance, can’t do any actions until next turn and -2 to all defences',
      3: 'Lose weapon, if weapon has wooden parts - it breaks',
      4: 'Fall down and lose weapon, if weapon has wooden parts - it breaks',
      5: 'You gain injury to your attack arm 2xTTTT',
      6: 'You gain injury to your attack arm 3xTTTT',
    }

    static meleeMisfortune4 = {
      1: 'Armor piece breaks, -1 Armor until fixed if you don’t have armor -1 to all actions for next Turn',
      2: 'Lose balance, can’t do any actions until next turn and -1 to all defences',
      3: 'Lose weapon',
      4: 'Fall down and lose weapon',
      5: 'You gain injury to your attack arm 1xTTTT',
      6: 'You gain injury to your attack arm 2xTTTT',
    }

    static rangedMisfortune3 = {
      1: 'The weapon is unusable until the end of combat. After that it needs some simple repairs',
      2: 'The weapon is unusable until the end of combat. After that it needs some complex repairs',
      3: 'If possible hit friendly target, if not - Lose weapon, weapon flies for 1d hexes to 1d direction (determined by hex side)',
      4: 'Lose balance, can’t do any actions until next turn and -2 to all defences',
      5: 'Get injury to Face: Bow/Crossbow - 2xTTTT, Firearms - 2xCCCC',
      6: 'Bow or Crossbow Breaks, Firearm explodes, also gain penalty from above^^ (Good quality weapons requires complex repairs instead)',
    }

    static rangedMisfortune4 = {
      1: 'The weapon is unusable until the end of combat.',
      2: 'The weapon is unusable until the end of combat. After that it needs some simple repairs',
      3: 'Lose weapon',
      4: 'Lose balance, can’t do any actions until next turn and -1 to all defences',
      5: 'Get injury to Face: Bow/Crossbow - 1xTTTT, Firearms - 1xCCCC',
      6: 'Bow or Crossbow Breaks, Firearm explodes, also gain penalty from above^^ (Good quality weapons requires complex repairs instead)',
    }

    static magicFortune17 = {
      1: 'Gain 2 Power',
      2: 'Gain 2 Power',
      3: 'Spell is Free',
      4: 'Spell is Free',
      5: 'Spell is Free and gain 2 Power',
      6: 'Spell is Free and gain 2 Power',
    }

    static magicFortune18 = {
      1: 'Spell is Free',
      2: 'Spell is Free',
      3: 'Spell is Free and gain 2 Power',
      4: 'Spell is Free and gain 2 Power',
      5: 'Spell is Free and gain 4 Power',
      6: 'Spell is Free and gain 4 Power',
    }

    static magicMisfortune3 = {
      1: 'Loose additional 3 Power',
      2: 'Loose additional 3 Power',
      3: 'Loose Double Power',
      4: 'Loose Double Power',
      5: 'Loose All Power',
      6: 'Loose All Power',
    }

    static magicMisfortune4 = {
      1: 'Loose additional 2 Power',
      2: 'Loose additional 2 Power',
      3: 'Loose additional 3 Power',
      4: 'Loose additional 3 Power',
      5: 'Lose Double Power',
      6: 'Lose Double Power',
    }

    static getMeleeFortune(roll, type) {
      return this[`meleeFortune${type}`][roll];
    }

    static getMeleeMisfortune(roll, type) {
      return this[`meleeMisfortune${type}`][roll];
    }

    static getRangedFortune(roll, type) {
      return this[`rangedFortune${type}`][roll];
    }

    static getRangedMisfortune(roll, type) {
      return this[`rangedMisfortune${type}`][roll];
    }
    static getMagicFortune(roll, type) {
      return this[`magicFortune${type}`][roll];
    }
    static getMagicMisfortune(roll, type) {
      return this[`magicMisfortune${type}`][roll];
    }

  }
