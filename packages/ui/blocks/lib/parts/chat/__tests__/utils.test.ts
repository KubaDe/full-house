import { describe, it, expect } from "vitest";
import { groupConsecutiveMessages, type MessagesGroup } from "../utils";
import { type Message } from "@repo/schemas";
describe("groupConsecutiveMessages", () => {
  it("should group consecutive messages by the same user", () => {
    const messages: Message[] = [
      { id: "1", userId: "user1", payload: { message: "Hello" } },
      { id: "2", userId: "user1", payload: { message: "How are you?" } },
      { id: "3", userId: "user2", payload: { message: "Hi" } },
      { id: "4", userId: "user1", payload: { message: "Good to hear!" } },
      { id: "5", userId: "user1", payload: { message: "What's up?" } },
    ];

    const expected: MessagesGroup[] = [
      {
        userId: "user1",
        id: "1,2",
        messages: [
          { id: "1", userId: "user1", payload: { message: "Hello" } },
          { id: "2", userId: "user1", payload: { message: "How are you?" } },
        ],
      },
      {
        userId: "user2",
        id: "3",
        messages: [{ id: "3", userId: "user2", payload: { message: "Hi" } }],
      },
      {
        userId: "user1",
        id: "4,5",
        messages: [
          { id: "4", userId: "user1", payload: { message: "Good to hear!" } },
          { id: "5", userId: "user1", payload: { message: "What's up?" } },
        ],
      },
    ];

    const result = groupConsecutiveMessages(messages);
    expect(result).toEqual(expected);
  });

  it("should return an empty array when given no messages", () => {
    const messages: Message[] = [];
    const result = groupConsecutiveMessages(messages);
    expect(result).toEqual([]);
  });

  it("should handle a single message correctly", () => {
    const messages = [
      { id: "1", userId: "user1", payload: { message: "Hello" } },
    ];

    const expected: MessagesGroup[] = [
      {
        userId: "user1",
        id: "1",
        messages: [{ id: "1", userId: "user1", payload: { message: "Hello" } }],
      },
    ];

    const result = groupConsecutiveMessages(messages);
    expect(result).toEqual(expected);
  });

  it("should handle messages with alternating userIds", () => {
    const messages = [
      { id: "1", userId: "user1", payload: { message: "Message 1" } },
      { id: "2", userId: "user2", payload: { message: "Message 2" } },
      { id: "3", userId: "user1", payload: { message: "Message 3" } },
    ];

    const expected: MessagesGroup[] = [
      {
        userId: "user1",
        id: "1",
        messages: [
          { id: "1", userId: "user1", payload: { message: "Message 1" } },
        ],
      },
      {
        userId: "user2",
        id: "2",
        messages: [
          { id: "2", userId: "user2", payload: { message: "Message 2" } },
        ],
      },
      {
        userId: "user1",
        id: "3",
        messages: [
          { id: "3", userId: "user1", payload: { message: "Message 3" } },
        ],
      },
    ];

    const result = groupConsecutiveMessages(messages);
    expect(result).toEqual(expected);
  });
});
