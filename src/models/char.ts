import { createSchema, Type, typedModel, ExtractDoc, ExtractProps, } from 'ts-mongoose';

export const CombatSkillSchemaSchema = createSchema({
        name: Type.string({ required: true }),
        lvl: Type.number({required: true}),
        attack: Type.string(),
        defense: Type.string(),
        masteries: Type.array().of(Type.string())
    },
    { _id: false, timestamps: true }
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
    combatSkills:Type.array({ required: true }).of(CombatSkillSchemaSchema),
    },
  { timestamps: { createdAt: true } }
);

export const CharModel = typedModel('Char', CharSchema);
export type CharDoc = ExtractDoc<typeof CharSchema>;
export type CharProps = ExtractProps<typeof CharSchema>;