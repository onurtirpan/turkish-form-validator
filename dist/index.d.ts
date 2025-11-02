interface ValidationResult {
    isValid: boolean;
    error?: string;
}
interface ValidateTCKNOptions {
    emptyError?: string;
    tooShortError?: string;
    tooLongError?: string;
    firstDigitZeroError?: string;
    invalidAlgorithmError?: string;
    notDigitsError?: string;
}
declare function validateTCKN(tckn: string, options?: ValidateTCKNOptions): ValidationResult;

interface PhoneValidationResult {
    valid: boolean;
    formatted: string | null;
    operator: string | null;
    message: string;
}
declare function validateTurkishPhone(phone: string): PhoneValidationResult;

interface TaxNoValidationResult {
    valid: boolean;
    formatted: string | null;
    message: string;
    checksum: boolean | null;
}
declare function formatTaxNoFunction(taxNo: string): string;
declare function validateTaxNo(taxNo: string): TaxNoValidationResult;

export { type PhoneValidationResult, type TaxNoValidationResult, type ValidateTCKNOptions, type ValidationResult, formatTaxNoFunction, validateTCKN, validateTaxNo, validateTurkishPhone };
