# Turkish Form Validator

A comprehensive form validation library specifically designed for Turkish language and Turkish-specific validation rules.

## Features

- ✅ Type-safe with TypeScript
- ✅ Turkish identification number (TCKN) validation
- ✅ Turkish tax number (Vergi Numarası) validation
- ✅ Turkish IBAN validation
- ✅ Phone number validation
- ✅ And much more...

## Installation

```bash
npm install turkish-form-validator
```

```bash
yarn add turkish-form-validator
```

```bash
pnpm add turkish-form-validator
```

## Usage

### TCKN Validation

```typescript
import { validateTCKN } from "turkish-form-validator";

const result = validateTCKN("12345678901");

if (result.isValid) {
  console.log("Valid TCKN");
} else {
  console.error(result.error);
}
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

## License

MIT
