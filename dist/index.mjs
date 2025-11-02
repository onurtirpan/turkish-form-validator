// src/validators/tckn.ts
var DEFAULT_OPTIONS = {
  emptyError: "TCKN 11 haneli olmal\u0131d\u0131r",
  tooShortError: "TCKN 11 haneli olmal\u0131d\u0131r",
  tooLongError: "TCKN 11 haneli olmal\u0131d\u0131r",
  firstDigitZeroError: "Ge\xE7ersiz TC Kimlik No",
  invalidAlgorithmError: "Ge\xE7ersiz TC Kimlik No",
  notDigitsError: "TCKN sadece rakamlardan olu\u015Fmal\u0131d\u0131r"
};
function validateTCKN(tckn, options) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  if (!tckn) {
    return {
      isValid: false,
      error: opts.emptyError
    };
  }
  if (tckn.length > 11) {
    return {
      isValid: false,
      error: opts.tooLongError
    };
  }
  if (tckn.length < 11) {
    return {
      isValid: false,
      error: opts.tooShortError
    };
  }
  if (tckn[0] === "0") {
    return {
      isValid: false,
      error: opts.firstDigitZeroError
    };
  }
  if (!/^\d+$/.test(tckn)) {
    return {
      isValid: false,
      error: opts.notDigitsError
    };
  }
  const digits = tckn.split("").map(Number);
  let oddSum = 0;
  let evenSum = 0;
  for (let i = 0; i < 9; i++) {
    if (i % 2 === 0) {
      oddSum += digits[i];
    } else {
      evenSum += digits[i];
    }
  }
  let checkDigit1 = (oddSum * 7 - evenSum) % 10;
  if (checkDigit1 < 0) {
    checkDigit1 += 10;
  }
  if (checkDigit1 !== digits[9]) {
    return {
      isValid: false,
      error: opts.invalidAlgorithmError
    };
  }
  const sumOfFirstTen = digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0);
  const checkDigit2 = sumOfFirstTen % 10;
  if (checkDigit2 !== digits[10]) {
    return {
      isValid: false,
      error: opts.invalidAlgorithmError
    };
  }
  return {
    isValid: true
  };
}

// src/validators/phone.ts
var OPERATOR_CODES = {
  "530": "Turkcell",
  "531": "Turkcell",
  "532": "Turkcell",
  "533": "Turkcell",
  "534": "Turkcell",
  "535": "Turkcell",
  "536": "Turkcell",
  "537": "Turkcell",
  "538": "Turkcell",
  "539": "Turkcell",
  "540": "Vodafone",
  "541": "Vodafone",
  "542": "Vodafone",
  "543": "Vodafone",
  "544": "Vodafone",
  "545": "Vodafone",
  "546": "Vodafone",
  "547": "Vodafone",
  "548": "Vodafone",
  "549": "Vodafone",
  "550": "T\xFCrk Telekom",
  "551": "T\xFCrk Telekom",
  "552": "T\xFCrk Telekom",
  "553": "T\xFCrk Telekom",
  "554": "T\xFCrk Telekom",
  "555": "T\xFCrk Telekom",
  "556": "T\xFCrk Telekom",
  "557": "T\xFCrk Telekom",
  "558": "T\xFCrk Telekom",
  "559": "T\xFCrk Telekom",
  "501": "Di\u011Fer",
  "505": "Di\u011Fer",
  "506": "Di\u011Fer",
  "507": "Di\u011Fer",
  "508": "Di\u011Fer",
  "509": "Di\u011Fer"
};
function cleanPhoneNumber(phone) {
  return phone.replace(/[\s\-\(\)\+]/g, "").replace(/^90/, "0");
}
function getOperatorCode(phone) {
  if (phone.length >= 3) {
    const code = phone.substring(1, 4);
    return OPERATOR_CODES[code] || null;
  }
  return null;
}
function validateTurkishPhone(phone) {
  if (!phone || phone.trim() === "") {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Telefon numaras\u0131 bo\u015F olamaz"
    };
  }
  const cleaned = cleanPhoneNumber(phone);
  if (!/^\d+$/.test(cleaned)) {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Telefon numaras\u0131 sadece rakam i\xE7ermelidir"
    };
  }
  if (cleaned.length < 11) {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Telefon numaras\u0131 11 haneli olmal\u0131d\u0131r"
    };
  }
  if (cleaned.length > 11) {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Telefon numaras\u0131 11 haneden uzun olamaz"
    };
  }
  if (cleaned[0] !== "0") {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Telefon numaras\u0131 0 ile ba\u015Flamal\u0131d\u0131r"
    };
  }
  if (cleaned[1] !== "5") {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Sadece cep telefonu numaralar\u0131 kabul edilir (5XX)"
    };
  }
  const operator = getOperatorCode(cleaned);
  if (!operator) {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Ge\xE7ersiz operat\xF6r kodu"
    };
  }
  const formatted = `+90${cleaned.substring(1)}`;
  return {
    valid: true,
    formatted,
    operator,
    message: "Ge\xE7erli telefon numaras\u0131"
  };
}

// src/validators/taxNo.ts
function cleanTaxNo(taxNo) {
  return taxNo.replace(/[\s\-]/g, "");
}
function formatTaxNo(taxNo) {
  if (taxNo.length !== 10) {
    return taxNo;
  }
  return `${taxNo.substring(0, 3)}-${taxNo.substring(3, 6)}-${taxNo.substring(
    6,
    9
  )}-${taxNo.substring(9)}`;
}
function formatTaxNoFunction(taxNo) {
  const cleaned = cleanTaxNo(taxNo);
  return formatTaxNo(cleaned);
}
function validateTaxNo(taxNo) {
  if (!taxNo || taxNo.trim() === "") {
    return {
      valid: false,
      formatted: null,
      message: "Vergi numaras\u0131 bo\u015F olamaz",
      checksum: null
    };
  }
  const cleaned = cleanTaxNo(taxNo);
  if (!/^\d+$/.test(cleaned)) {
    return {
      valid: false,
      formatted: null,
      message: "Vergi numaras\u0131 sadece rakam i\xE7ermelidir",
      checksum: null
    };
  }
  if (cleaned.length < 10) {
    return {
      valid: false,
      formatted: null,
      message: "Vergi numaras\u0131 10 haneli olmal\u0131d\u0131r",
      checksum: null
    };
  }
  if (cleaned.length > 10) {
    return {
      valid: false,
      formatted: null,
      message: "Vergi numaras\u0131 10 haneden uzun olamaz",
      checksum: null
    };
  }
  if (cleaned[0] === "0") {
    return {
      valid: false,
      formatted: null,
      message: "Vergi numaras\u0131 0 ile ba\u015Flayamaz",
      checksum: null
    };
  }
  const digits = cleaned.split("").map(Number);
  const tempValues = [];
  for (let i = 0; i < 9; i++) {
    const digit = digits[i];
    let value = (digit + (10 - i)) % 10;
    if (value === 9) {
      value = 0;
    }
    tempValues.push(value);
  }
  const total = tempValues.reduce((sum, value) => sum + value, 0);
  const checkDigit = (10 - total % 10) % 10;
  const checksumValid = checkDigit === digits[9];
  if (!checksumValid) {
    return {
      valid: false,
      formatted: null,
      message: "Invalid tax number",
      checksum: false
    };
  }
  return {
    valid: true,
    formatted: formatTaxNo(cleaned),
    message: "Valid tax number",
    checksum: true
  };
}

export { formatTaxNoFunction, validateTCKN, validateTaxNo, validateTurkishPhone };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map