// Elements
const input = document.getElementById('imageInput');
const qualityInput = document.getElementById('quality');
const preview = document.getElementById('preview');
const previewImg = document.getElementById('previewImg');
const sizeInfo = document.getElementById('sizeInfo');
const downloadBtn = document.getElementById('downloadBtn');

let originalFile, originalImage;

// Handle file selection
input.addEventListener('change', () => {
  originalFile = input.files[0];
  if (!originalFile) return;

  if (originalFile.size > 10 * 1024 * 1024) { // 10 MB limit
    alert("Max image size is 10MB");
    input.value = "";
    return;
  }

  // Load the original image once
  originalImage = new Image();
  originalImage.src = URL.createObjectURL(originalFile);
  originalImage.onload = () => compressImage(); // initial compression
});

// Compress whenever slider changes
qualityInput.addEventListener('input', () => {
  if (!originalImage) return;
  compressImage();
});

function compressImage() {
  if (!originalImage) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  ctx.drawImage(originalImage, 0, 0);

  canvas.toBlob(blob => {
    if (!blob) return;
    previewImg.src = URL.createObjectURL(blob);
    compressedBlob = blob;

    sizeInfo.textContent =
      `Original: ${(originalFile.size / 1024).toFixed(1)} KB | ` +
      `Compressed: ${(blob.size / 1024).toFixed(1)} KB`;

    preview.classList.remove('hidden');
  }, 'image/jpeg', parseFloat(qualityInput.value));
}

// Download compressed image
downloadBtn.addEventListener('click', () => {
  if (!compressedBlob) return;

  const link = document.createElement('a');
  link.href = URL.createObjectURL(compressedBlob);
  link.download = 'compressed-image.jpg';
  link.click();
});
