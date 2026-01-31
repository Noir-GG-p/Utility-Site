const textInput = document.getElementById("textInput");
const findInput = document.getElementById("findInput");
const replaceInput = document.getElementById("replaceInput");
const replaceBtn = document.getElementById("replaceBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const resultArea = document.getElementById("resultArea");

// Replace all occurrences
replaceBtn.addEventListener("click", () => {
  const text = textInput.value;
  const findText = findInput.value;
  const replaceText = replaceInput.value;

  if (!text) {
    resultArea.innerHTML = "<p>Please enter some text!</p>";
    resultArea.classList.remove("hidden");
    return;
  }
  if (!findText) {
    resultArea.innerHTML = "<p>Please enter text to find!</p>";
    resultArea.classList.remove("hidden");
    return;
  }

  // Use global replace with regex, escape special characters
  const escapedFind = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedFind, "g");
  const replaced = text.replace(regex, replaceText);

  resultArea.textContent = replaced;
  resultArea.classList.remove("hidden");
});

// Clear all fields
clearBtn.addEventListener("click", () => {
  textInput.value = "";
  findInput.value = "";
  replaceInput.value = "";
  resultArea.classList.add("hidden");
});

// Copy result to clipboard
copyBtn.addEventListener("click", () => {
  if (!resultArea.textContent) return;
  navigator.clipboard.writeText(resultArea.textContent).then(() => {
    alert("Result copied to clipboard!");
  });
});
