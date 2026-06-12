import { describe, expect, it } from "vitest";
import { buildPayNowPayload, isMobileNumber } from "../paynow";

/**
 * Independent CRC-16/CCITT-FALSE implementation used to verify the payload
 * checksum. Validated below against the standard check value:
 * crc16("123456789") === 0x29B1.
 */
function referenceCrc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

describe("isMobileNumber", () => {
  it("accepts 8-digit Singapore mobiles starting with 8 or 9", () => {
    expect(isMobileNumber("91234567")).toBe(true);
    expect(isMobileNumber("81234567")).toBe(true);
    expect(isMobileNumber("+6591234567")).toBe(true);
    expect(isMobileNumber("9123 4567")).toBe(true);
  });

  it("rejects landlines, short numbers, and UENs", () => {
    expect(isMobileNumber("61234567")).toBe(false);
    expect(isMobileNumber("9123456")).toBe(false);
    expect(isMobileNumber("201403121W")).toBe(false);
    expect(isMobileNumber("")).toBe(false);
  });
});

describe("buildPayNowPayload", () => {
  it("validates the reference CRC implementation against the known check value", () => {
    expect(referenceCrc16("123456789")).toBe("29B1");
  });

  it("ends with a valid CRC-16/CCITT-FALSE checksum", () => {
    const payload = buildPayNowPayload({ payTo: "91234567", name: "Acme", amount: 11.05, reference: "INV-1" });
    const body = payload.slice(0, -4);
    expect(body.endsWith("6304")).toBe(true);
    expect(payload.slice(-4)).toBe(referenceCrc16(body));
  });

  it("starts with the EMVCo payload format indicator", () => {
    const payload = buildPayNowPayload({ payTo: "91234567", name: "Acme" });
    expect(payload.startsWith("000201")).toBe(true);
  });

  it("marks QRs without an amount as static and with an amount as dynamic", () => {
    const open = buildPayNowPayload({ payTo: "91234567", name: "Acme" });
    const fixed = buildPayNowPayload({ payTo: "91234567", name: "Acme", amount: 50 });
    expect(open).toContain("010211");
    expect(fixed).toContain("010212");
  });

  it("uses proxy type 0 and normalises mobile numbers to +65 format", () => {
    const payload = buildPayNowPayload({ payTo: "91234567", name: "Acme" });
    expect(payload).toContain("0009SG.PAYNOW");
    expect(payload).toContain("010100"); // proxy type tag 01, value "0"
    expect(payload).toContain("0211+6591234567");
  });

  it("uses proxy type 2 for UENs", () => {
    const payload = buildPayNowPayload({ payTo: "201403121W", name: "Acme" });
    expect(payload).toContain("010102"); // proxy type tag 01, value "2"
    expect(payload).toContain("0210201403121W");
  });

  it("includes the amount with two decimal places", () => {
    const payload = buildPayNowPayload({ payTo: "91234567", name: "Acme", amount: 11.5 });
    expect(payload).toContain("540511.50");
  });

  it("treats a zero amount as an open-amount (static) QR", () => {
    const payload = buildPayNowPayload({ payTo: "91234567", name: "Acme", amount: 0 });
    expect(payload).toContain("010211");
    expect(payload).not.toContain("54040.00");
  });

  it("includes SGD currency and SG country code", () => {
    const payload = buildPayNowPayload({ payTo: "91234567", name: "Acme" });
    expect(payload).toContain("5303702");
    expect(payload).toContain("5802SG");
  });

  it("embeds the invoice reference as the bill number", () => {
    const payload = buildPayNowPayload({ payTo: "91234567", name: "Acme", reference: "INV-2026-0042" });
    expect(payload).toContain("62170113INV-2026-0042");
  });

  it("truncates merchant names longer than 25 characters", () => {
    const payload = buildPayNowPayload({
      payTo: "91234567",
      name: "A Very Long Business Name Exceeding The Limit",
    });
    expect(payload).toContain("5925A Very Long Business Name");
  });
});
