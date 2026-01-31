// Elements
const fileInput = document.getElementById("imageInput");
const formatSelect = document.getElementById("formatSelect");
const qualityInput = document.getElementById("qualityInput");
const qualityValue = document.getElementById("qualityValue");
const previewGrid = document.getElementById("previewGrid");
const bulkToggle = document.getElementById("bulkToggle");

// Show quality value
qualityInput.addEventListener("input", () => {
  qualityValue.textContent = qualityInput.value;
});

// Store uploaded images
let imageFiles = [];

// Handle file input
fileInput.addEventListener("change", (e) => {
  imageFiles = Array.from(e.target.files);
  renderPreviews();
});

// Render image previews
function renderPreviews() {
  previewGrid.innerHTML = "";
  imageFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = () => {
      const div = document.createElement("div");
      div.className = "bg-gray-50 p-3 rounded shadow space-y-2 text-center";

      const img = document.createElement("img");
      img.src = reader.result;
      img.className = "max-w-full rounded-xl shadow";

      const btn = document.createElement("button");
      btn.textContent = "Convert & Download";
      btn.className = "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full";

      btn.addEventListener("click", () => convertImage(file));

      div.appendChild(img);
      div.appendChild(btn);
      previewGrid.appendChild(div);
    };
    reader.readAsDataURL(file);
  });
}

// Convert a single image
async function convertImage(file) {
  const format = formatSelect.value;
  const quality = parseInt(qualityInput.value) / 100;

  const img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  if (format === "pdf") {
    // PDF conversion using jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: img.width > img.height ? "landscape" : "portrait",
      unit: "px",
      format: [img.width, img.height],
    });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, img.width, img.height);
    pdf.save(file.name.replace(/\.[^/.]+$/, "") + ".pdf");
  } else {
    // Fix extensions properly
    let ext = format === "jpeg" ? "jpg" : format;
    canvas.toBlob(
      (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name.replace(/\.[^/.]+$/, "") + "." + ext;
        a.click();
      },
      "image/" + format,
      quality
    );
  }
}

// Bulk conversion
bulkToggle.addEventListener("change", () => {
  if (bulkToggle.checked && imageFiles.length > 0) {
    imageFiles.forEach((file) => convertImage(file));
  }
});
