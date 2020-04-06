import { createSchema, Type, typedModel, ExtractDoc, ExtractProps, } from 'ts-mongoose';
 export const CombatMode = ['melee', 'ranged', 'defense','unknown'] as const;
export enum CombatModeEnum{
  melee='melee',ranged='ranged',defense='defense', unknown='unknown'
}
export const CombatSchema = createSchema({
        name: Type.string({ required: true }),
        lvl: Type.number({required: true}),
        attr: Type.string(),
        mode: Type.string({ required: true, enum: CombatMode }),
    },
    { _id: false, timestamps: false }
);
export const CharSchema = createSchema({
    playerId: Type.string({required: true,unique: true, index: true}),
    name: Type.string({ required: true }),
    attr: Type.object({ required: true }).of({
      str: Type.number(),
      sta: Type.number(),
      dex: Type.number(),
      ref: Type.number(),
      per: Type.number(),
      will: Type.number(),
    }),
    combat:Type.array({ required: true }).of(CombatSchema),
    },
  { timestamps: { createdAt: true } }
);

export const CharModel = typedModel('Char', CharSchema);
export type CharDoc = ExtractDoc<typeof CharSchema>;
export type CharProps = ExtractProps<typeof CharSchema>;
export type CombatSkillProps = ExtractProps<typeof CombatSchema>;