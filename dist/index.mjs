// src/validators/tckn.ts
function validateTCKN(tckn) {
  if (!tckn || tckn.length !== 11) {
    return {
      isValid: false,
      error: "TCKN must be exactly 11 digits"
    };
  }
  return {
    isValid: true
  };
}

export { validateTCKN };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map