// lib/helpers/readableStreamBuffer.ts
import { Readable } from 'stream';

export function ReadableStreamBuffer(buffer: Uint8Array): Readable {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}
