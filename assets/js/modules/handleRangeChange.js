const countDisplayElement = document.querySelector("#count-display");
const rangeElement = document.querySelector("#count");

const handleRangeChange = (event) => {
  const value = event.target.value;

  countDisplayElement.textContent = `${value} characters`;
};

rangeElement.addEventListener("input", handleRangeChange);
