export interface PhoneValidationResult {
  valid: boolean;
  formatted: string | null;
  operator: string | null;
  message: string;
}

const OPERATOR_CODES: Record<string, string> = {
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
  "550": "Türk Telekom",
  "551": "Türk Telekom",
  "552": "Türk Telekom",
  "553": "Türk Telekom",
  "554": "Türk Telekom",
  "555": "Türk Telekom",
  "556": "Türk Telekom",
  "557": "Türk Telekom",
  "558": "Türk Telekom",
  "559": "Türk Telekom",
  "501": "Diğer",
  "505": "Diğer",
  "506": "Diğer",
  "507": "Diğer",
  "508": "Diğer",
  "509": "Diğer",
};

function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[\s\-\(\)\+]/g, "").replace(/^90/, "0");
}

function getOperatorCode(phone: string): string | null {
  if (phone.length >= 3) {
    const code = phone.substring(1, 4);
    return OPERATOR_CODES[code] || null;
  }
  return null;
}

export function validateTurkishPhone(phone: string): PhoneValidationResult {
  if (!phone || phone.trim() === "") {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Telefon numarası boş olamaz",
    };
  }

  const cleaned = cleanPhoneNumber(phone);

  if (!/^\d+$/.test(cleaned)) {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Telefon numarası sadece rakam içermelidir",
    };
  }

  if (cleaned.length < 11) {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Telefon numarası 11 haneli olmalıdır",
    };
  }

  if (cleaned.length > 11) {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Telefon numarası 11 haneden uzun olamaz",
    };
  }

  if (cleaned[0] !== "0") {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Telefon numarası 0 ile başlamalıdır",
    };
  }

  if (cleaned[1] !== "5") {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Sadece cep telefonu numaraları kabul edilir (5XX)",
    };
  }

  const operator = getOperatorCode(cleaned);

  if (!operator) {
    return {
      valid: false,
      formatted: null,
      operator: null,
      message: "Geçersiz operatör kodu",
    };
  }

  const formatted = `+90${cleaned.substring(1)}`;

  return {
    valid: true,
    formatted: formatted,
    operator: operator,
    message: "Geçerli telefon numarası",
  };
}
