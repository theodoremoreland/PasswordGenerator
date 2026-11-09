export default (e) => {
  const element = e.target;
  const passwordElement = document.querySelector("#password");

  if (!element || !passwordElement) {
    return;
  }

  passwordElement.select();
  passwordElement.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(passwordElement.value);
  alert("Copied to clipboard");
};
