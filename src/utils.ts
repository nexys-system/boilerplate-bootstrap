export const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @param reportName https://stackoverflow.com/questions/35038884/download-file-from-bytes-in-javascript
 * @see fileName: filename of out
 * @param byte
 * @param type
 */
export const saveByteArray = (
  fileName: string,
  byte: Buffer | string,
  type: string = "application/text"
) => {
  const blob = new Blob([byte], { type });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);

  //link.download = fileName;
  link.setAttribute("download", fileName);
  link.click();
};
