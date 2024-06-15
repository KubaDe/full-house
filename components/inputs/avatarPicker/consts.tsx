import {
  BustPose,
  Face,
  FacialHair,
  Hair,
  Accessories,
  type BustPoseType,
  type FaceType,
  type HairType,
  type FacialHairType,
  type AccessoryType,
} from "react-peeps";
import { z } from "zod";

export const partsOptions = {
  body: Object.keys(BustPose),
  face: Object.keys(Face),
  hair: Object.keys(Hair),
  facialHair: Object.keys(FacialHair),
  accessory: Object.keys(Accessories),
};

export const avatarPickerInputSchema = z.object({
  body: z.custom<BustPoseType>((value: string): value is BustPoseType =>
    partsOptions.body.includes(value as BustPoseType),
  ),
  face: z.custom<FaceType>((value: string): value is FaceType =>
    partsOptions.face.includes(value as FaceType),
  ),
  hair: z.custom<HairType>((value: string): value is HairType =>
    partsOptions.hair.includes(value as HairType),
  ),
  facialHair: z.custom<FacialHairType>((value: string): value is FacialHairType =>
    partsOptions.facialHair.includes(value as FacialHairType),
  ),
  accessory: z.custom<AccessoryType>((value: string): value is AccessoryType =>
    partsOptions.accessory.includes(value as AccessoryType),
  ),
});

export type Avatar = z.infer<typeof avatarPickerInputSchema>;

export enum Direction {
  Left = "left",
  Right = "right",
}

export const defaultAvatar = {
  body: "ArmsCrossed",
  face: "Cheeky",
  hair: "Buns",
  facialHair: "FullMedium",
  accessory: "GlassRound",
} satisfies Avatar;
