# AHT10 Wokwi Custom Chip

This repository contains a simulation of the AHT10 temperature and humidity sensor for Wokwi using the Custom Chip API.

## Files

- `aht10.chip.json`: Chip definition file.
- `aht10.chip.js`: Sensor logic with realistic I2C command handling.

## Usage

1. Upload these files to a GitHub repository.
2. Reference it in your `diagram.json`:

```json
"dependencies": {
  "aht10": "github:yourusername/aht10-sim"
}
```

Enjoy simulating the AHT10!
