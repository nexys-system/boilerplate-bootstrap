export const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));
export const saveByteArray = (fileName, byte, type = "application/text") => {
  const blob = new Blob([byte], {type});
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  link.click();
};
