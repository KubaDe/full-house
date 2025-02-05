import { type Avatar, partsOptions } from "../schemas/avatarSchema";

export const defaultAvatar = {
  accessory: partsOptions.accessory[0],
  body: partsOptions.body[0],
  face: partsOptions.face[0],
  facialHair: partsOptions.facialHair[0],
  hair: partsOptions.hair[0],
} as Avatar;
