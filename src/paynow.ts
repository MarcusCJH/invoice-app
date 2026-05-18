// Builds an EMVCo TLV payload for a Singapore PayNow QR code (UEN-based).
// Spec: EMVCo Merchant-Presented QR v1.1, PayNow proxy type 2 = UEN.

function tlv(tag: string, value: string): string {
  return `${tag}${String(value.length).padStart(2, "0")}${value}`;
}

// CRC-16/CCITT-FALSE: poly 0x1021, init 0xFFFF, no reflection.
function crc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export interface PayNowOptions {
  uen: string;
  name: string;
  /** Leave undefined for open-amount QR; provide total for a pre-filled amount. */
  amount?: number;
  /** Invoice / bill number shown in the payer's banking app. Max 25 chars. */
  reference?: string;
}

export function buildPayNowPayload({ uen, name, amount, reference }: PayNowOptions): string {
  const hasAmount = typeof amount === "number" && amount > 0;

  const merchantAccount = [
    tlv("00", "SG.PAYNOW"),
    tlv("01", "2"),          // proxy type: 2 = UEN
    tlv("02", uen),
    tlv("03", "0"),          // amount not editable when pre-filled
  ].join("");

  const parts: string[] = [
    tlv("00", "01"),                                          // Payload Format Indicator
    tlv("01", hasAmount ? "12" : "11"),                       // 12 = dynamic (fixed amt), 11 = static
    tlv("26", merchantAccount),                               // PayNow merchant account info
    tlv("52", "0000"),                                        // Merchant Category Code
    tlv("53", "702"),                                         // Currency: SGD
    ...(hasAmount ? [tlv("54", amount!.toFixed(2))] : []),    // Transaction Amount
    tlv("58", "SG"),                                          // Country Code
    tlv("59", name.slice(0, 25)),                             // Merchant Name
    tlv("60", "Singapore"),                                   // Merchant City
    ...(reference ? [tlv("62", tlv("01", reference.slice(0, 25)))] : []), // Bill number
    "6304",                                                   // CRC tag (value appended below)
  ];

  const payload = parts.join("");
  return payload + crc16(payload);
}
