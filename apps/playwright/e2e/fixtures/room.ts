import { db } from "@repo/db";
import { SessionType, sessionTypeSchema } from "@repo/schemas";
import { sessionLifecycleService } from "@repo/services/session";

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

  async startSession({ type, userId }: { userId: string; type: SessionType }) {
    await sessionLifecycleService.createSession({
      roomId: this.roomId,
      userId,
      type,
    });
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

  async init(
    props:
      | {
          skipSession: true;
          userId: undefined;
        }
      | {
          skipSession?: false;
          userId: string;
        },
  ) {
    const { skipSession, userId } = props;
    await this.stateHelpers.createRoom({ name: StateHelpers.DEFAULTS.name });
    if (!skipSession) {
      await this.stateHelpers.startSession({
        type: sessionTypeSchema.enum.meta,
        userId,
      });
    }
  }

  async cleanup() {
    await this.stateHelpers.clearRoom();
  }
}
