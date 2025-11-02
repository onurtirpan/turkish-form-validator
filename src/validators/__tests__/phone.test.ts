import { describe, it, expect } from "vitest";
import { validateTurkishPhone } from "../phone";

describe("validateTurkishPhone", () => {
  it("should validate a correct Turkcell number", () => {
    const result = validateTurkishPhone("0532 123 45 67");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("+905321234567");
    expect(result.operator).toBe("Turkcell");
  });

  it("should validate a correct Vodafone number", () => {
    const result = validateTurkishPhone("05421234567");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("+905421234567");
    expect(result.operator).toBe("Vodafone");
  });

  it("should validate a correct Türk Telekom number", () => {
    const result = validateTurkishPhone("05551234567");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("+905551234567");
    expect(result.operator).toBe("Türk Telekom");
  });

  it("should validate number with +90 prefix", () => {
    const result = validateTurkishPhone("+905321234567");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("+905321234567");
    expect(result.operator).toBe("Turkcell");
  });

  it("should validate number with 90 prefix", () => {
    const result = validateTurkishPhone("90 532 123 45 67");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("+905321234567");
    expect(result.operator).toBe("Turkcell");
  });

  it("should validate number with parentheses", () => {
    const result = validateTurkishPhone("(0532) 123 45 67");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("+905321234567");
    expect(result.operator).toBe("Turkcell");
  });

  it("should validate number with dashes", () => {
    const result = validateTurkishPhone("0532-123-45-67");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("+905321234567");
    expect(result.operator).toBe("Turkcell");
  });

  it("should reject number that is too short", () => {
    const result = validateTurkishPhone("0532 12 34");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Telefon numarası 11 haneli olmalıdır");
  });

  it("should reject landline number starting with 0XX where X != 5", () => {
    const result = validateTurkishPhone("0632 123 45 67");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe(
      "Sadece cep telefonu numaraları kabul edilir (5XX)"
    );
  });

  it("should reject number with alphabetic characters", () => {
    const result = validateTurkishPhone("abc def ghij");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Telefon numarası sadece rakam içermelidir");
  });

  it("should reject empty string", () => {
    const result = validateTurkishPhone("");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Telefon numarası boş olamaz");
  });

  it("should reject number not starting with 0", () => {
    const result = validateTurkishPhone("53212345678");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Telefon numarası 0 ile başlamalıdır");
  });

  it("should reject number that is too long", () => {
    const result = validateTurkishPhone("053212345678");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Telefon numarası 11 haneden uzun olamaz");
  });

  it("should validate Diğer operator code (501)", () => {
    const result = validateTurkishPhone("05011234567");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("+905011234567");
    expect(result.operator).toBe("Diğer");
  });

  it("should validate Diğer operator code (505)", () => {
    const result = validateTurkishPhone("05051234567");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("+905051234567");
    expect(result.operator).toBe("Diğer");
  });

  it("should reject invalid operator code", () => {
    const result = validateTurkishPhone("05601234567");
    expect(result.valid).toBe(false);
    expect(result.formatted).toBe(null);
    expect(result.message).toBe("Geçersiz operatör kodu");
  });
});
