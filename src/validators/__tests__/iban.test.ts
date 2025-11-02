import { describe, it, expect } from "vitest";
import {
  validateTurkishIBAN,
  formatIBAN,
  calculateCheckDigit,
  getBankName,
} from "../iban";

describe("validateTurkishIBAN", () => {
  it("should validate a correct IBAN (İş Bankası)", () => {
    const result = validateTurkishIBAN("TR330006100519786457841326");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("TR33 0006 1005 1978 6457 8413 26");
    expect(result.bankCode).toBe("00061");
    expect(result.bankName).toBe("Türkiye İş Bankası A.Ş.");
    expect(result.accountNumber).toBe("0519786457841326");
    expect(result.checkDigits).toBe("33");
    expect(result.checksumValid).toBe(true);
  });

  it("should validate IBAN with spaces", () => {
    const result = validateTurkishIBAN("TR33 0006 1005 1978 6457 8413 26");
    expect(result.valid).toBe(true);
    expect(result.bankCode).toBe("00061");
  });

  it("should validate IBAN with dashes", () => {
    const result = validateTurkishIBAN("TR33-0006-1005-1978-6457-8413-26");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("TR33 0006 1005 1978 6457 8413 26");
  });

  it("should validate IBAN with lowercase", () => {
    const result = validateTurkishIBAN("tr330006100519786457841326");
    expect(result.valid).toBe(true);
    expect(result.formatted).toBe("TR33 0006 1005 1978 6457 8413 26");
  });

  it("should validate Akbank IBAN", () => {
    const result = validateTurkishIBAN("TR860004600000000000123456");
    expect(result.valid).toBe(true);
    expect(result.bankCode).toBe("00046");
    expect(result.bankName).toBe("Akbank T.A.Ş.");
  });

  it("should reject IBAN with wrong checksum", () => {
    const result = validateTurkishIBAN("TR330006100519786457841325");
    expect(result.valid).toBe(false);
    expect(result.checksumValid).toBe(false);
    expect(result.message).toBe("Geçersiz IBAN");
  });

  it("should reject IBAN that is too short", () => {
    const result = validateTurkishIBAN("TR330006100519786457841");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("IBAN 26 karakter olmalıdır");
  });

  it("should reject IBAN that is too long", () => {
    const result = validateTurkishIBAN("TR3300061005197864578413266");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("IBAN 26 karakter olmalıdır");
  });

  it("should reject IBAN with wrong country code", () => {
    const result = validateTurkishIBAN("GR330006100519786457841326");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("IBAN TR ile başlamalıdır");
  });

  it("should reject IBAN with alphabetic characters", () => {
    const result = validateTurkishIBAN("TR33000610A519786457841326");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("IBAN TR sonrası sadece rakam içermelidir");
  });

  it("should reject IBAN without TR", () => {
    const result = validateTurkishIBAN("330006100519786457841326");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("IBAN TR ile başlamalıdır");
  });

  it("should reject empty string", () => {
    const result = validateTurkishIBAN("");
    expect(result.valid).toBe(false);
    expect(result.message).toBe("IBAN boş olamaz");
  });

  it("should validate Ziraat Bankası IBAN", () => {
    const result = validateTurkishIBAN("TR020001000999901234567890");
    expect(result.valid).toBe(true);
    expect(result.bankCode).toBe("00010");
    expect(result.bankName).toBe("Türkiye Cumhuriyeti Ziraat Bankası A.Ş.");
  });
});

describe("formatIBAN", () => {
  it("should format a valid IBAN", () => {
    const result = formatIBAN("TR330006100519786457841326");
    expect(result).toBe("TR33 0006 1005 1978 6457 8413 26");
  });

  it("should format IBAN with spaces", () => {
    const result = formatIBAN("TR33 0006 1005 1978 6457 8413 26");
    expect(result).toBe("TR33 0006 1005 1978 6457 8413 26");
  });

  it("should return original if invalid length", () => {
    const result = formatIBAN("TR330006");
    expect(result).toBe("TR330006");
  });
});

describe("getBankName", () => {
  it("should return bank name for valid code", () => {
    const name = getBankName("00061");
    expect(name).toBe("Türkiye İş Bankası A.Ş.");
  });

  it("should return null for invalid code", () => {
    const name = getBankName("99999");
    expect(name).toBe(null);
  });
});

describe("calculateCheckDigit", () => {
  it("should calculate correct check digit", () => {
    const checkDigit = calculateCheckDigit("00061", "0", "0519786457841326");
    expect(checkDigit).toBe("33");
  });
});
