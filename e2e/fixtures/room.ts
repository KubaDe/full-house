import { db } from "@/server/db/prisma";

class StateHelpers {
  static readonly DEFAULTS = {
    name: "Test room",
  };
  private _roomId?: string;

  get roomId() {
    if (!this._roomId) {
      throw new Error("Room ID is required to create an account");
    }
    return this._roomId;
  }

  set roomId(value: string) {
    this._roomId = value;
  }

  async createRoom(data: { name: string }) {
    const { id } = await db.room.create({
      data,
    });
    this.roomId = id;
  }

  async addUser(userId: string) {
    await db.usersOnRooms.create({
      data: {
        userId,
        roomId: this.roomId,
      },
    });
  }

  async clearRoom() {
    await db.room.delete({ where: { id: this.roomId } });
  }
}

export class Room {
  public stateHelpers: StateHelpers;

  constructor() {
    this.stateHelpers = new StateHelpers();
  }

  async init() {
    await this.stateHelpers.createRoom({ name: StateHelpers.DEFAULTS.name });
  }

  async cleanup() {
    await this.stateHelpers.clearRoom();
  }
}
