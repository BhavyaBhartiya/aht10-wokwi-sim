export function setup({ i2c, simulator }) {
  const AHT10_ADDR = 0x38;
  let measurementTriggered = false;

  const temperatureC = 25.0;
  const humidity = 55.0;

  i2c.onWriteTo(AHT10_ADDR, (data) => {
    if (data.length >= 3 && data[0] === 0xAC && data[1] === 0x33 && data[2] === 0x00) {
      measurementTriggered = true;
      simulator.log("AHT10: Measurement triggered");
    }
  });

  i2c.onReadFrom(AHT10_ADDR, (length) => {
    if (!measurementTriggered || length < 6) {
      return new Uint8Array(length).fill(0xFF);
    }

    const humRaw = Math.round(humidity * 1048576 / 100);
    const tempRaw = Math.round((temperatureC + 50) * 1048576 / 200);

    const data = new Uint8Array(6);
    data[0] = 0x00;
    data[1] = (humRaw >> 12) & 0xFF;
    data[2] = (humRaw >> 4) & 0xFF;
    data[3] = ((humRaw & 0x0F) << 4) | ((tempRaw >> 16) & 0x0F);
    data[4] = (tempRaw >> 8) & 0xFF;
    data[5] = tempRaw & 0xFF;

    simulator.log("AHT10: Returning measurement data");

    measurementTriggered = false;
    return data;
  });
}
