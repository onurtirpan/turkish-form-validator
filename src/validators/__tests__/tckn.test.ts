import { describe, it, expect } from "vitest";
import { validateTCKN } from "../tckn";

describe("validateTCKN", () => {
  it("should validate a correct TCKN", () => {
    const result = validateTCKN("12345678950");
    expect(result.isValid).toBe(true);
  });

  it("should reject invalid TCKN", () => {
    const result = validateTCKN("123");
    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("should reject TCKN starting with 0", () => {
    const result = validateTCKN("01234567890");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Geçersiz TC Kimlik No");
  });

  it("should reject TCKN with invalid algorithm", () => {
    const result = validateTCKN("12345678901");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Geçersiz TC Kimlik No");
  });

  it("should reject TCKN with non-digit characters", () => {
    const result = validateTCKN("1234567890a");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("TCKN sadece rakamlardan oluşmalıdır");
  });
});
