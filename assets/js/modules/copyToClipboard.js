export default (e) => {
  const element = e.target;

  if (!element.classList.contains("copy-to-clipboard")) {
    return;
  }

  element.select();
  element.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(element.value);
  alert("Copied to clipboard");
};
