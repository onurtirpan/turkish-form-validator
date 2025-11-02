import { describe, it, expect } from "vitest";
import { validateTCKN } from "../tckn";

describe("validateTCKN", () => {
  it("should validate a correct TCKN", () => {
    const result = validateTCKN("12345678901");
    expect(result.isValid).toBe(true);
  });

  it("should reject invalid TCKN", () => {
    const result = validateTCKN("123");
    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
  });
});
