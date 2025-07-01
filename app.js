const imageUpload = document.getElementById('imageUpload');
const preview = document.getElementById('preview');
const labelText = document.getElementById('label-text');

imageUpload.addEventListener('change', () => {
    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            preview.src = reader.result;
            preview.style.display = 'block';
            labelText.style.display = 'none';  // Hide the "Choisir une image" text when image is shown
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
        preview.style.display = 'none';
        labelText.style.display = 'inline';  // Show the text if no image
    }
});
