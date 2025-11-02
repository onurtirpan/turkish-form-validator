/**
 * TCKN (Turkish Republic Identification Number) Validator
 *
 * Validates Turkish identification numbers according to the official algorithm
 *
 * @param tckn - The TCKN string to validate
 * @returns Validation result with isValid flag and error message if invalid
 *
 * @example
 * ```typescript
 * const result = validateTCKN('12345678901');
 * if (result.isValid) {
 *   console.log('Valid TCKN');
 * } else {
 *   console.log(result.error);
 * }
 * ```
 */
interface ValidationResult {
    isValid: boolean;
    error?: string;
}
declare function validateTCKN(tckn: string): ValidationResult;

export { type ValidationResult, validateTCKN };
