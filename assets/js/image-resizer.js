// Elements
const imageInput = document.getElementById('imageInput');
const bulkToggle = document.getElementById('bulkToggle');
const lockAspectToggle = document.getElementById('lockAspectToggle');
const bgColorInput = document.getElementById('bgColor');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const scaleInput = document.getElementById('scaleInput');
const previewGrid = document.getElementById('previewGrid');

// Handle bulk toggle
bulkToggle.addEventListener('change', () => {
  imageInput.multiple = bulkToggle.checked;
});

// Handle file upload
imageInput.addEventListener('change', () => {
  const files = Array.from(imageInput.files);
  if (!files.length) return;

  // Clear previous previews
  previewGrid.innerHTML = '';

  files.forEach(file => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert(`${file.name} exceeds 10MB and will be skipped.`);
      return;
    }
    processImage(file);
  });
});

// Process single image
function processImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => resizeAndPreview(img, file.name);
  };
  reader.readAsDataURL(file);
}

// Resize and create preview card
function resizeAndPreview(img, fileName) {
  let targetWidth = parseInt(widthInput.value) || img.width;
  let targetHeight = parseInt(heightInput.value) || img.height;
  const scale = parseInt(scaleInput.value) || 100;

  // Apply scale
  targetWidth = Math.round(targetWidth * (scale / 100));
  targetHeight = Math.round(targetHeight * (scale / 100));

  // Lock aspect ratio
  if (lockAspectToggle.checked) {
    const aspect = img.width / img.height;
    if (widthInput.value && !heightInput.value) {
      targetHeight = Math.round(targetWidth / aspect);
    } else if (!widthInput.value && heightInput.value) {
      targetWidth = Math.round(targetHeight * aspect);
    } else {
      targetHeight = Math.round(targetWidth / aspect);
    }
  }

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  // Fill background color
  ctx.fillStyle = bgColorInput.value || '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw resized image centered
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  // Convert canvas to blob for download
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);

    // Create preview card
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-xl shadow-md flex flex-col items-center';

    const previewImg = document.createElement('img');
    previewImg.src = url;
    previewImg.className = 'max-h-48 mb-2 rounded';

    const info = document.createElement('p');
    info.className = 'text-sm text-gray-600 mb-2';
    info.textContent = `Original: ${img.width}x${img.height} | Resized: ${targetWidth}x${targetHeight}`;

    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700';
    downloadBtn.textContent = 'Download';
    downloadBtn.addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = url;
      a.download = `resized-${fileName}`;
      a.click();
    });

    card.appendChild(previewImg);
    card.appendChild(info);
    card.appendChild(downloadBtn);

    previewGrid.appendChild(card);
  }, 'image/jpeg', 0.9);
}
