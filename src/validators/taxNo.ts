export interface TaxNoValidationResult {
  valid: boolean;
  formatted: string | null;
  message: string;
  checksum: boolean | null;
}

function cleanTaxNo(taxNo: string): string {
  return taxNo.replace(/[\s\-]/g, "");
}

function formatTaxNo(taxNo: string): string {
  if (taxNo.length !== 10) {
    return taxNo;
  }
  return `${taxNo.substring(0, 3)}-${taxNo.substring(3, 6)}-${taxNo.substring(
    6,
    9
  )}-${taxNo.substring(9)}`;
}

export function formatTaxNoFunction(taxNo: string): string {
  const cleaned = cleanTaxNo(taxNo);
  return formatTaxNo(cleaned);
}

export function validateTaxNo(taxNo: string): TaxNoValidationResult {
  if (!taxNo || taxNo.trim() === "") {
    return {
      valid: false,
      formatted: null,
      message: "Vergi numarası boş olamaz",
      checksum: null,
    };
  }

  const cleaned = cleanTaxNo(taxNo);

  if (!/^\d+$/.test(cleaned)) {
    return {
      valid: false,
      formatted: null,
      message: "Vergi numarası sadece rakam içermelidir",
      checksum: null,
    };
  }

  if (cleaned.length < 10) {
    return {
      valid: false,
      formatted: null,
      message: "Vergi numarası 10 haneli olmalıdır",
      checksum: null,
    };
  }

  if (cleaned.length > 10) {
    return {
      valid: false,
      formatted: null,
      message: "Vergi numarası 10 haneden uzun olamaz",
      checksum: null,
    };
  }

  if (cleaned[0] === "0") {
    return {
      valid: false,
      formatted: null,
      message: "Vergi numarası 0 ile başlayamaz",
      checksum: null,
    };
  }

  const digits = cleaned.split("").map(Number);

  const tempValues: number[] = [];

  for (let i = 0; i < 9; i++) {
    const digit = digits[i];
    let value = (digit + (10 - i)) % 10;
    if (value === 9) {
      value = 0;
    }
    tempValues.push(value);
  }

  const total = tempValues.reduce((sum, value) => sum + value, 0);

  const checkDigit = (10 - (total % 10)) % 10;

  const checksumValid = checkDigit === digits[9];

  if (!checksumValid) {
    return {
      valid: false,
      formatted: null,
      message: "Geçersiz vergi numarası",
      checksum: false,
    };
  }

  return {
    valid: true,
    formatted: formatTaxNo(cleaned),
    message: "Geçerli vergi numarası",
    checksum: true,
  };
}
