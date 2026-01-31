const textInput = document.getElementById("textInput");
const caseButtons = document.querySelectorAll(".caseBtn");
const clearBtn = document.getElementById("clearBtn");
const resultArea = document.getElementById("resultArea");

// Helper functions for case conversions
function toTitleCase(str) {
  return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function toSentenceCase(str) {
  return str
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}

function toToggleCase(str) {
  return str
    .split("")
    .map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join("");
}

// Apply selected case
caseButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const text = textInput.value;
    if (!text) return;

    let converted = "";
    switch (btn.dataset.case) {
      case "uppercase":
        converted = text.toUpperCase();
        break;
      case "lowercase":
        converted = text.toLowerCase();
        break;
      case "titlecase":
        converted = toTitleCase(text);
        break;
      case "sentencecase":
        converted = toSentenceCase(text);
        break;
      case "togglecase":
        converted = toToggleCase(text);
        break;
    }

    resultArea.textContent = converted;
    resultArea.classList.remove("hidden");
  });
});

// Clear textarea and result
clearBtn.addEventListener("click", () => {
  textInput.value = "";
  resultArea.classList.add("hidden");
});
