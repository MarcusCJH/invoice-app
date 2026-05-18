// Builds an EMVCo TLV payload for a Singapore PayNow QR code.
// Spec: EMVCo Merchant-Presented QR v1.1.
// Proxy type "0" = mobile number, "2" = UEN.
//
// NOTE: PayNow QR codes must be scanned from within a Singapore banking app
// (DBS/POSB, OCBC, UOB, etc.) — not the phone's default camera.

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

/** Singapore mobile: 8 digits starting with 8 or 9, optional +65 prefix. */
export function isMobileNumber(value: string): boolean {
  return /^(\+65)?[89]\d{7}$/.test(value.replace(/[\s-]/g, ""));
}

/** Normalise to +65XXXXXXXX format required by PayNow proxy type 0. */
function normalizeMobile(value: string): string {
  const v = value.replace(/[\s-]/g, "");
  if (v.startsWith("+65")) return v;
  if (v.startsWith("65") && v.length === 10) return "+" + v;
  if (v.length === 8) return "+65" + v;
  return v;
}

export interface PayNowOptions {
  /**
   * UEN (e.g. "201403121W") or Singapore mobile number (e.g. "91234567" / "+6591234567").
   * Proxy type is detected automatically.
   */
  payTo: string;
  name: string;
  /** Leave undefined for open-amount QR; provide total for a pre-filled amount. */
  amount?: number;
  /** Invoice / bill number shown in the payer's banking app. Max 25 chars. */
  reference?: string;
}

export function buildPayNowPayload({ payTo, name, amount, reference }: PayNowOptions): string {
  const hasAmount = typeof amount === "number" && amount > 0;
  const isMobile = isMobileNumber(payTo);
  const proxyValue = isMobile ? normalizeMobile(payTo) : payTo;
  const proxyType = isMobile ? "0" : "2";

  const merchantAccount = [
    tlv("00", "SG.PAYNOW"),
    tlv("01", proxyType),
    tlv("02", proxyValue),
    tlv("03", "1"),   // amount editable — accepted by all banking apps
  ].join("");

  const parts: string[] = [
    tlv("00", "01"),                                                         // Payload Format Indicator
    tlv("01", hasAmount ? "12" : "11"),                                      // 12 = dynamic, 11 = static
    tlv("26", merchantAccount),                                              // PayNow merchant account
    tlv("52", "0000"),                                                       // Merchant Category Code
    tlv("53", "702"),                                                        // Currency: SGD
    ...(hasAmount ? [tlv("54", amount!.toFixed(2))] : []),                   // Transaction Amount
    tlv("58", "SG"),                                                         // Country Code
    tlv("59", name.slice(0, 25)),                                            // Merchant Name
    tlv("60", "Singapore"),                                                  // Merchant City
    ...(reference ? [tlv("62", tlv("01", reference.slice(0, 25)))] : []),   // Bill number
    "6304",                                                                  // CRC tag
  ];

  const payload = parts.join("");
  return payload + crc16(payload);
}
