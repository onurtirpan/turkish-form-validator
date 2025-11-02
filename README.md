# Turkish Form Validator 🇹🇷

[![npm version](https://img.shields.io/npm/v/turkish-form-validator)](https://www.npmjs.com/package/turkish-form-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive TypeScript library for validating Turkish-specific form fields. This package provides robust validation functions for TCKN (Turkish ID), phone numbers, tax numbers, license plates, and IBANs with full TypeScript support.

Türkçe form alanları için kapsamlı bir validasyon kütüphanesi. TCKN, telefon, vergi numarası, plaka ve IBAN validasyonu için TypeScript destekli güçlü fonksiyonlar sağlar.

---

## 📋 Features / Özellikler

- ✅ **TCKN (Turkish ID) Validation** - Turkish Identification Number validation with algorithm verification
- ✅ **Phone Number Validation** - Turkish phone number format validation and formatting
- ✅ **Tax Number Validation** - Turkish tax number (Vergi Numarası) validation
- ✅ **License Plate Validation** - Turkish license plate format validation
- ✅ **IBAN Validation** - Turkish IBAN validation with bank name detection
- ✅ **TypeScript Support** - Full TypeScript type definitions included
- ✅ **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JavaScript
- ✅ **Tree-shaking Support** - Import only what you need
- ✅ **Zero Dependencies** - Lightweight and fast

---

## 🚀 Installation / Kurulum

```bash
npm install turkish-form-validator
```

```bash
yarn add turkish-form-validator
```

```bash
pnpm add turkish-form-validator
```

---

## 📖 Usage / Kullanım

### TCKN Validation / TCKN Validasyonu

Validates Turkish identification numbers using the official algorithm.

```typescript
import { validateTCKN } from "turkish-form-validator";

const result = validateTCKN("12345678901");

if (result.isValid) {
  console.log("Valid TCKN");
} else {
  console.error(result.error); // Error message in Turkish
}
```

**With custom error messages / Özel hata mesajları ile:**

```typescript
const result = validateTCKN("12345678901", {
  emptyError: "TCKN is required",
  tooShortError: "TCKN must be 11 digits",
  invalidAlgorithmError: "Invalid TCKN",
});
```

### Phone Number Validation / Telefon Numarası Validasyonu

Validates and formats Turkish phone numbers.

```typescript
import { validateTurkishPhone } from "turkish-form-validator";

const result = validateTurkishPhone("05321234567");

if (result.valid) {
  console.log(result.formatted); // "0532 123 45 67"
} else {
  console.error(result.message);
}
```

**Supports multiple formats / Birden fazla format destekler:**

```typescript
validateTurkishPhone("05321234567"); // ✅ Valid
validateTurkishPhone("+905321234567"); // ✅ Valid
validateTurkishPhone("5321234567"); // ✅ Valid
validateTurkishPhone("905321234567"); // ✅ Valid
```

### Tax Number Validation / Vergi Numarası Validasyonu

Validates Turkish tax numbers (Vergi Numarası).

```typescript
import { validateTaxNo, formatTaxNoFunction } from "turkish-form-validator";

const result = validateTaxNo("1234567890");

if (result.valid) {
  console.log("Valid tax number");
} else {
  console.error(result.message);
}

// Format tax number
const formatted = formatTaxNoFunction("1234567890"); // "123 456 789 0"
```

### License Plate Validation / Plaka Validasyonu

Validates Turkish license plate formats.

```typescript
import { validateTurkishPlate } from "turkish-form-validator";

const result = validateTurkishPlate("34ABC123");

if (result.valid) {
  console.log("Valid license plate");
  console.log(result.city); // City name
  console.log(result.formatted); // Formatted plate
} else {
  console.error(result.message);
}
```

### IBAN Validation / IBAN Validasyonu

Validates Turkish IBANs and detects bank names.

```typescript
import {
  validateTurkishIBAN,
  formatIBAN,
  getBankName,
} from "turkish-form-validator";

const result = validateTurkishIBAN("TR330006100519786457841326");

if (result.valid) {
  console.log(result.bankName); // Bank name in Turkish
  console.log(result.formatted); // Formatted IBAN
  console.log(result.bankCode); // Bank code
} else {
  console.error(result.message);
}

// Helper functions / Yardımcı fonksiyonlar
const formatted = formatIBAN("TR330006100519786457841326");
const bankName = getBankName("00061"); // "Akbank T.A.Ş."
```

---

## 🎯 Framework Examples / Framework Örnekleri

### React Example / React Örneği

```tsx
import React, { useState } from "react";
import {
  validateTCKN,
  validateTurkishPhone,
  validateTurkishIBAN,
} from "turkish-form-validator";

function MyForm() {
  const [tckn, setTckn] = useState("");
  const [phone, setPhone] = useState("");
  const [iban, setIban] = useState("");

  const handleTCKNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTckn(value);
    const result = validateTCKN(value);
    if (!result.isValid) {
      console.error(result.error);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    const result = validateTurkishPhone(value);
    if (result.valid) {
      console.log("Formatted:", result.formatted);
    } else {
      console.error(result.message);
    }
  };

  return (
    <form>
      <input
        type="text"
        value={tckn}
        onChange={handleTCKNChange}
        placeholder="TCKN"
      />
      <input
        type="text"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Telefon"
      />
    </form>
  );
}
```

### Vue 3 Example (Composition API) / Vue 3 Örneği

```vue
<template>
  <form>
    <input v-model="tckn" @input="validateTCKNInput" placeholder="TCKN" />
    <input v-model="phone" @input="validatePhoneInput" placeholder="Telefon" />
    <input v-model="iban" @input="validateIBANInput" placeholder="IBAN" />
  </form>
</template>

<script setup>
import { ref } from "vue";
import {
  validateTCKN,
  validateTurkishPhone,
  validateTurkishIBAN,
} from "turkish-form-validator";

const tckn = ref("");
const phone = ref("");
const iban = ref("");

const validateTCKNInput = () => {
  const result = validateTCKN(tckn.value);
  if (!result.isValid) {
    console.error(result.error);
  }
};

const validatePhoneInput = () => {
  const result = validateTurkishPhone(phone.value);
  if (result.valid) {
    console.log("Formatted:", result.formatted);
  }
};

const validateIBANInput = () => {
  const result = validateTurkishIBAN(iban.value);
  if (result.valid) {
    console.log("Bank:", result.bankName);
  }
};
</script>
```

### Angular Example / Angular Örneği

```typescript
import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { validateTCKN, validateTurkishPhone } from "turkish-form-validator";

@Component({
  selector: "app-my-form",
  template: `
    <form [formGroup]="form">
      <input formControlName="tckn" placeholder="TCKN" />
      <input formControlName="phone" placeholder="Telefon" />
      <input formControlName="iban" placeholder="IBAN" />
    </form>
  `,
})
export class MyFormComponent {
  form = new FormGroup({
    tckn: new FormControl(""),
    phone: new FormControl(""),
    iban: new FormControl(""),
  });

  constructor() {
    this.form.get("tckn")?.valueChanges.subscribe((value) => {
      const result = validateTCKN(value);
      if (!result.isValid) {
        this.form.get("tckn")?.setErrors({ invalid: result.error });
      }
    });

    this.form.get("phone")?.valueChanges.subscribe((value) => {
      const result = validateTurkishPhone(value);
      if (!result.valid) {
        this.form.get("phone")?.setErrors({ invalid: result.message });
      }
    });
  }
}
```

### Vanilla JavaScript Example / Saf JavaScript Örneği

```javascript
import {
  validateTCKN,
  validateTurkishPhone,
  validateTurkishIBAN,
} from "turkish-form-validator";

// TCKN Validation
const tcknResult = validateTCKN("12345678901");
console.log(tcknResult.isValid);

// Phone Validation
const phoneResult = validateTurkishPhone("05321234567");
if (phoneResult.valid) {
  console.log("Formatted phone:", phoneResult.formatted);
}

// IBAN Validation
const ibanResult = validateTurkishIBAN("TR330006100519786457841326");
if (ibanResult.valid) {
  console.log("Bank:", ibanResult.bankName);
}
```

### TypeScript Example with Types / TypeScript Tip Örnekleri

```typescript
import {
  validateTCKN,
  validateTurkishPhone,
  validateTurkishIBAN,
  type ValidationResult,
  type PhoneValidationResult,
  type IBANValidationResult,
} from "turkish-form-validator";

const tcknResult: ValidationResult = validateTCKN("12345678901");
const phoneResult: PhoneValidationResult = validateTurkishPhone("05321234567");
const ibanResult: IBANValidationResult = validateTurkishIBAN(
  "TR330006100519786457841326"
);
```

---

## 📚 API Reference / API Referansı

### `validateTCKN(tckn: string, options?: ValidateTCKNOptions): ValidationResult`

Validates Turkish identification numbers.

**Options:**

- `emptyError?: string` - Error message when TCKN is empty
- `tooShortError?: string` - Error message when TCKN is too short
- `tooLongError?: string` - Error message when TCKN is too long
- `firstDigitZeroError?: string` - Error message when first digit is zero
- `invalidAlgorithmError?: string` - Error message when algorithm check fails
- `notDigitsError?: string` - Error message when TCKN contains non-digits

### `validateTurkishPhone(phone: string): PhoneValidationResult`

Validates and formats Turkish phone numbers.

**Returns:**

- `valid: boolean` - Whether the phone number is valid
- `formatted: string | null` - Formatted phone number (e.g., "0532 123 45 67")
- `message: string` - Error message if invalid

### `validateTaxNo(taxNo: string): TaxNoValidationResult`

Validates Turkish tax numbers.

**Returns:**

- `valid: boolean` - Whether the tax number is valid
- `message: string` - Error message if invalid

### `formatTaxNoFunction(taxNo: string): string`

Formats tax number with spaces (e.g., "123 456 789 0").

### `validateTurkishPlate(plate: string): PlateValidationResult`

Validates Turkish license plates.

**Returns:**

- `valid: boolean` - Whether the plate is valid
- `city: string | null` - City name if valid
- `formatted: string | null` - Formatted plate number
- `message: string` - Error message if invalid

### `validateTurkishIBAN(iban: string): IBANValidationResult`

Validates Turkish IBANs.

**Returns:**

- `valid: boolean` - Whether the IBAN is valid
- `bankName: string | null` - Bank name in Turkish
- `bankCode: string | null` - Bank code
- `formatted: string | null` - Formatted IBAN
- `message: string` - Error message if invalid

### `formatIBAN(iban: string): string`

Formats IBAN with spaces (e.g., "TR33 0006 1005 1978 6457 8413 26").

### `getBankName(bankCode: string): string | null`

Returns bank name for a given bank code.

### `calculateCheckDigit(bankCode: string, reserveDigit: string, accountNumber: string): string`

Calculates IBAN check digit.

---

## 🌟 Supported Formats / Desteklenen Formatlar

- ✅ ES Modules (`import`/`export`)
- ✅ CommonJS (`require`/`module.exports`)
- ✅ TypeScript type definitions
- ✅ Browser and Node.js compatible
- ✅ Tree-shaking support

---

## 🤝 Contributing / Katkıda Bulunma

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

Katkılarınızı bekliyoruz! Lütfen önce [Katkı Rehberi](CONTRIBUTING.md)'ni okuyun.

---

## 📄 License / Lisans

MIT License - see LICENSE file for details.

MIT Lisansı - detaylar için LICENSE dosyasına bakın.

---

## 📞 Support / Destek

For issues, feature requests, or questions, please open an issue on GitHub.

Sorunlar, özellik istekleri veya sorular için lütfen GitHub'da bir issue açın.
