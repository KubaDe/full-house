import { describe, it, expect } from "vitest";

describe("Math Operations", () => {
  it("should return the correct sum of two numbers", () => {
    const result = 4 + 5;
    expect(result).toBe(9);
  });

  it("should return the correct product of two numbers", () => {
    const result = 3 * 7;
    expect(result).toBe(21);
  });

  it("should verify that a number is greater than another number", () => {
    const a = 10;
    const b = 5;
    expect(a).toBeGreaterThan(b);
  });
});
