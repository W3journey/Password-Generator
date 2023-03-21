export const copyPassword = (password) => {
  try {
    navigator.clipboard.writeText(password);
  } catch (err) {
    const textarea = document.createElement("textarea");
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
};
