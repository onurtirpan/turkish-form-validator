export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ValidateTCKNOptions {
  emptyError?: string;
  tooShortError?: string;
  tooLongError?: string;
  firstDigitZeroError?: string;
  invalidAlgorithmError?: string;
  notDigitsError?: string;
}

const DEFAULT_OPTIONS: Required<ValidateTCKNOptions> = {
  emptyError: "TCKN 11 haneli olmalıdır",
  tooShortError: "TCKN 11 haneli olmalıdır",
  tooLongError: "TCKN 11 haneli olmalıdır",
  firstDigitZeroError: "Geçersiz TC Kimlik No",
  invalidAlgorithmError: "Geçersiz TC Kimlik No",
  notDigitsError: "TCKN sadece rakamlardan oluşmalıdır",
};

export function validateTCKN(
  tckn: string,
  options?: ValidateTCKNOptions
): ValidationResult {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  if (!tckn) {
    return {
      isValid: false,
      error: opts.emptyError,
    };
  }

  if (tckn.length > 11) {
    return {
      isValid: false,
      error: opts.tooLongError,
    };
  }

  if (tckn.length < 11) {
    return {
      isValid: false,
      error: opts.tooShortError,
    };
  }

  if (tckn[0] === "0") {
    return {
      isValid: false,
      error: opts.firstDigitZeroError,
    };
  }

  if (!/^\d+$/.test(tckn)) {
    return {
      isValid: false,
      error: opts.notDigitsError,
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
      error: opts.invalidAlgorithmError,
    };
  }

  const sumOfFirstTen = digits
    .slice(0, 10)
    .reduce((sum, digit) => sum + digit, 0);
  const checkDigit2 = sumOfFirstTen % 10;
  if (checkDigit2 !== digits[10]) {
    return {
      isValid: false,
      error: opts.invalidAlgorithmError,
    };
  }

  return {
    isValid: true,
  };
}
