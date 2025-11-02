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
/**
 * Validates Turkish mobile phone numbers
 *
 * Accepts various formats and validates according to Turkish mobile phone number rules:
 * - Must start with 0
 * - Second digit must be 5 (mobile phones only)
 * - Must be 11 digits total
 * - Must have valid operator code (Turkcell, Vodafone, Türk Telekom, or MVNO)
 *
 * @param phone - Phone number string in various formats (e.g., "0532 123 45 67", "+905321234567", "0532-123-45-67")
 * @returns Validation result with formatted number, operator name, and status
 *
 * @example
 * ```typescript
 * const result = validateTurkishPhone("0532 123 45 67");
 * if (result.valid) {
 *   console.log(result.formatted); // "+905321234567"
 *   console.log(result.operator); // "Turkcell"
 * }
 * ```
 */
declare function validateTurkishPhone(phone: string): PhoneValidationResult;

export { type PhoneValidationResult, type ValidateTCKNOptions, type ValidationResult, validateTCKN, validateTurkishPhone };
