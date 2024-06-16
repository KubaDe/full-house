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
  body: z.custom<BustPoseType>(
    (value: string): value is BustPoseType => partsOptions.body.includes(value as BustPoseType),
    "Incorrect body type",
  ),
  face: z.custom<FaceType>(
    (value: string): value is FaceType => partsOptions.face.includes(value as FaceType),
    "Incorrect face type",
  ),
  hair: z.custom<HairType>(
    (value: string): value is HairType => partsOptions.hair.includes(value as HairType),
    "Incorrect hair type",
  ),
  facialHair: z.custom<FacialHairType>(
    (value: string): value is FacialHairType => partsOptions.facialHair.includes(value as FacialHairType),
    "Incorrect facial hair type",
  ),
  accessory: z.custom<AccessoryType>(
    (value: string): value is AccessoryType => partsOptions.accessory.includes(value as AccessoryType),
    "Incorrect accessory type",
  ),
});

type Avatar = z.infer<typeof avatarPickerInputSchema>;

export enum Direction {
  Left = "left",
  Right = "right",
}

export const defaultAvatar = {
  accessory: partsOptions.accessory[0],
  body: partsOptions.body[0],
  face: partsOptions.face[0],
  facialHair: partsOptions.facialHair[0],
  hair: partsOptions.hair[0],
} as Avatar;
