import { ReadableStream } from "stream/web";

/**
 * Check ObjectId validity
 *
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-10
 *
 * @param {string} id the object id
 * @returns {RegExpMatchArray | nul} true | false
 */
export const checkObjectId = (id: string): RegExpMatchArray | null => {
  return id ? id.match(/^[0-9a-fA-F]{24}$/) : null;
};

/**
 * Omit specific properties from an object
 *
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-02
 *
 * @param {any} object the object data
 * @param {Array<string>} excludes the properties to exclude
 * @returns {any} of the object without exclude properties
 */
export const _omit = (object: any, excludes: Array<string>) => {
  return Object.fromEntries(
    Object.entries(object).filter((e) => !excludes.includes(e[0]))
  );
};

/**
 * Omit specific properties from an object
 *
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-02
 *
 * @param {strign} str the string to slugify
 * @returns {any} of the object without exclude properties
 */
export const slugify = (str: string): string => {
  return (
    String(str)
      // split accented characters into their base characters
      // and diacritical marks
      .normalize("NFKD")
      // remove all the accents, which happen to be all in
      // the \u03xx UNICODE block.
      .replace(/[\u0300-\u036f]/g, "")
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-")
  ); // remove consecutive hyphens
};

/**
   * Parses the provided body, which can be a string, Blob, or ReadableStream.
   *
   * If the body is a string, it is directly parsed as JSON.
   * If the body is a Blob or a ReadableStream, it is first converted to a string
   * before parsing it as JSON. This function throws an error if the body is of an
   * unsupported type.
   *
   * @param {string | Blob | NodeJS.ReadableStream} body - The body to parse, which can be a string, Blob
   * or ReadableStream.
   * @returns {Promise<object>} A promise that resolves to the parsed object.
   * @throws {Error} Throws an error if the body is of an unsupported type.
   */
  export const parseBody = async(
    body: string | Blob | NodeJS.ReadableStream
  ): Promise<object> => {
    if (typeof body === "string") {
      // Directly parse if it's a string
      return JSON.parse(body);
    }

    if (body instanceof Blob || body instanceof ReadableStream) {
      // Convert Blob/ReadableStream to string before parsing
      const text = await blobToText(body);
      return JSON.parse(text);
    }

    throw new Error("Unsupported body type");
  }

  /**
   * Converts a Blob or ReadableStream to a string.
   *
   * If the provided blob is a Blob, it uses the Blob's `text()` method to extract
   * the content as a string. If the blob is a ReadableStream, it reads the stream
   * and concatenates the chunks into a single string.
   *
   * @param {Blob | NodeJS.ReadableStream} blob - The Blob or ReadableStream to convert to a string.
   * @returns {Promise<string>} A promise that resolves to the string content of the Blob or ReadableStream.
   * @throws {Error} Throws an error if the blob is neither a Blob nor a ReadableStream.
   */
  export const blobToText =  async(
    blob: Blob | NodeJS.ReadableStream
  ): Promise<string> => {
    if (blob instanceof Blob) {
      return blob.text(); // Use Blob.text() if it's a Blob
    } else if (blob instanceof ReadableStream) {
      // If it's a ReadableStream, we need to read it as text
      return new Promise((resolve, reject) => {
        let data = "";
        blob.on("data", (chunk) => {
          data += chunk;
        });
        blob.on("end", () => resolve(data));
        blob.on("error", reject);
      });
    }

    throw new Error("Unsupported Blob/ReadableStream type");
  }
