import { z } from "zod";
import {
  Accessories,
  type AccessoryType,
  BustPose,
  type BustPoseType,
  Face,
  type FaceType,
  FacialHair,
  type FacialHairType,
  Hair,
  type HairType,
} from "react-peeps";

export const partsOptions = {
  body: Object.keys(BustPose),
  face: Object.keys(Face),
  hair: Object.keys(Hair),
  facialHair: Object.keys(FacialHair),
  accessory: Object.keys(Accessories),
};

export const avatarSchema = z.object({
  body: z.custom<BustPoseType>(
    (value: string): value is BustPoseType =>
      partsOptions.body.includes(value as BustPoseType),
    "Incorrect body type",
  ),
  face: z.custom<FaceType>(
    (value: string): value is FaceType =>
      partsOptions.face.includes(value as FaceType),
    "Incorrect face type",
  ),
  hair: z.custom<HairType>(
    (value: string): value is HairType =>
      partsOptions.hair.includes(value as HairType),
    "Incorrect hair type",
  ),
  facialHair: z.custom<FacialHairType>(
    (value: string): value is FacialHairType =>
      partsOptions.facialHair.includes(value as FacialHairType),
    "Incorrect facial hair type",
  ),
  accessory: z.custom<AccessoryType>(
    (value: string): value is AccessoryType =>
      partsOptions.accessory.includes(value as AccessoryType),
    "Incorrect accessory type",
  ),
});

export type Avatar = z.infer<typeof avatarSchema>;
