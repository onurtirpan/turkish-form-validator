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

export { type ValidateTCKNOptions, type ValidationResult, validateTCKN };
