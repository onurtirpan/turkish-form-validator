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

export { validateTCKN };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map