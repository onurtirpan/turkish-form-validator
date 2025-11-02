export interface IBANValidationResult {
  valid: boolean;
  formatted: string | null;
  bankCode: string | null;
  bankName: string | null;
  accountNumber: string | null;
  checkDigits: string | null;
  checksumValid: boolean | null;
  message: string;
}

const BANK_CODES: Record<string, string> = {
  "00001": "T.C. Ziraat Bankası",
  "00010": "Türkiye Cumhuriyeti Ziraat Bankası A.Ş.",
  "00012": "Türkiye Halk Bankası A.Ş.",
  "00015": "Türkiye Vakıflar Bankası T.A.O.",
  "00032": "Türk Ekonomi Bankası A.Ş.",
  "00046": "Akbank T.A.Ş.",
  "00059": "Şekerbank T.A.Ş.",
  "00062": "Türkiye Garanti Bankası A.Ş.",
  "00061": "Türkiye İş Bankası A.Ş.",
  "00064": "Türkiye İş Bankası A.Ş. (Alternative)",
  "00067": "Yapı ve Kredi Bankası A.Ş.",
  "00091": "Türk Ekonomi Bankası A.Ş. (TEB)",
  "00096": "Türkiye Finans Katılım Bankası A.Ş.",
  "00099": "ING Bank A.Ş.",
  "00103": "Fibabanka A.Ş.",
  "00108": "Türkiye Kalkınma Bankası A.Ş.",
  "00111": "QNB Finansbank A.Ş.",
  "00123": "Odea Bank A.Ş.",
  "00124": "Denizbank A.Ş.",
  "00134": "Kuveyt Türk Katılım Bankası A.Ş.",
  "00143": "Albaraka Türk Katılım Bankası A.Ş.",
  "00146": "Vakıf Katılım Bankası A.Ş.",
  "00203": "Ziraat Katılım Bankası A.Ş.",
  "00206": "QNB Finans Portföy Yönetimi A.Ş.",
  "00209": "Alternatif Bank A.Ş.",
};

function cleanIBAN(iban: string): string {
  return iban.replace(/[\s\-]/g, "").toUpperCase();
}

function mod97(iban: string): number {
  const rearranged = iban.substring(4) + iban.substring(0, 4);
  const numericString = rearranged.replace(/[A-Z]/g, (char) => {
    return (char.charCodeAt(0) - 55).toString();
  });

  let remainder = BigInt(0);
  for (let i = 0; i < numericString.length; i++) {
    remainder =
      (remainder * BigInt(10) + BigInt(numericString[i])) % BigInt(97);
  }

  return Number(remainder);
}

export function calculateCheckDigit(
  bankCode: string,
  reserveDigit: string,
  accountNumber: string
): string {
  const ibanWithoutCheck = "TR00" + bankCode + reserveDigit + accountNumber;
  const remainder = mod97(ibanWithoutCheck);
  const checkDigit = 98 - remainder;
  return checkDigit.toString().padStart(2, "0");
}

export function getBankName(bankCode: string): string | null {
  return BANK_CODES[bankCode] || null;
}

export function formatIBAN(iban: string): string {
  const cleaned = cleanIBAN(iban);
  if (cleaned.length !== 26) {
    return iban;
  }
  return `${cleaned.substring(0, 4)} ${cleaned.substring(
    4,
    8
  )} ${cleaned.substring(8, 12)} ${cleaned.substring(
    12,
    16
  )} ${cleaned.substring(16, 20)} ${cleaned.substring(
    20,
    24
  )} ${cleaned.substring(24, 26)}`;
}

export function validateTurkishIBAN(iban: string): IBANValidationResult {
  if (!iban || iban.trim() === "") {
    return {
      valid: false,
      formatted: null,
      bankCode: null,
      bankName: null,
      accountNumber: null,
      checkDigits: null,
      checksumValid: null,
      message: "IBAN boş olamaz",
    };
  }

  const cleaned = cleanIBAN(iban);

  if (cleaned.length < 2 || !cleaned.startsWith("TR")) {
    if (!cleaned.startsWith("TR") && cleaned.length >= 2) {
      return {
        valid: false,
        formatted: null,
        bankCode: null,
        bankName: null,
        accountNumber: null,
        checkDigits: null,
        checksumValid: null,
        message: "IBAN TR ile başlamalıdır",
      };
    }
  }

  if (!cleaned.startsWith("TR")) {
    return {
      valid: false,
      formatted: null,
      bankCode: null,
      bankName: null,
      accountNumber: null,
      checkDigits: null,
      checksumValid: null,
      message: "IBAN TR ile başlamalıdır",
    };
  }

  if (cleaned.length !== 26) {
    return {
      valid: false,
      formatted: null,
      bankCode: null,
      bankName: null,
      accountNumber: null,
      checkDigits: null,
      checksumValid: null,
      message: "IBAN 26 karakter olmalıdır",
    };
  }

  const remaining = cleaned.substring(2);

  if (!/^\d{24}$/.test(remaining)) {
    return {
      valid: false,
      formatted: null,
      bankCode: null,
      bankName: null,
      accountNumber: null,
      checkDigits: null,
      checksumValid: null,
      message: "IBAN TR sonrası sadece rakam içermelidir",
    };
  }

  const checkDigits = cleaned.substring(2, 4);
  const bankCode = cleaned.substring(4, 9);
  const accountNumber = cleaned.substring(10, 26);

  const remainder = mod97(cleaned);

  const checksumValid = remainder === 1;

  if (!checksumValid) {
    return {
      valid: false,
      formatted: null,
      bankCode: null,
      bankName: null,
      accountNumber: null,
      checkDigits: checkDigits,
      checksumValid: false,
      message: "Geçersiz IBAN",
    };
  }

  const bankName = getBankName(bankCode);
  const formatted = formatIBAN(cleaned);

  return {
    valid: true,
    formatted: formatted,
    bankCode: bankCode,
    bankName: bankName,
    accountNumber: accountNumber,
    checkDigits: checkDigits,
    checksumValid: true,
    message: "Geçerli IBAN",
  };
}
