const textInput = document.getElementById("textInput");
const countBtn = document.getElementById("countBtn");
const clearBtn = document.getElementById("clearBtn");
const resultArea = document.getElementById("resultArea");

// Count words, characters, lines, reading time
countBtn.addEventListener("click", () => {
  const text = textInput.value.trim();

  if (!text) {
    resultArea.innerHTML = "<p>Please enter some text!</p>";
    resultArea.classList.remove("hidden");
    return;
  }

  const words = text.split(/\s+/).filter(Boolean).length;
  const characters = text.length;
  const lines = text.split(/\r?\n/).filter(line => line.trim() !== "").length;
  const readingTime = (words / 200).toFixed(2); // 200 WPM estimate

  resultArea.innerHTML = `
    <p><strong>Words:</strong> ${words}</p>
    <p><strong>Characters:</strong> ${characters}</p>
    <p><strong>Lines:</strong> ${lines}</p>
    <p><strong>Estimated Reading Time:</strong> ${readingTime} minutes</p>
  `;
  resultArea.classList.remove("hidden");
});

// Clear textarea and result
clearBtn.addEventListener("click", () => {
  textInput.value = "";
  resultArea.classList.add("hidden");
});
