import { randomBytes } from "crypto";
import v4 from "uuid";

function generateUUID(): string {
  const bytes = randomBytes(16);

  // Set the version bits (version 4 UUID)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;

  // Set the variant bits (RFC 4122 variant)
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  // Format the bytes as a UUID string
  const uuid =
    bytes.toString("hex", 0, 4) + "-" + bytes.toString("hex", 4, 6) + "-" + bytes.toString("hex", 6, 8) + "-" + bytes.toString("hex", 8, 10) + "-" + bytes.toString("hex", 10, 16);

  return uuid;
}

export default generateUUID;
