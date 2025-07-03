const imageUpload = document.getElementById('imageUpload');
const preview = document.getElementById('preview');
const labelText = document.getElementById('label-text');
const idenfityButton = document.getElementById("identify-btn");
const result = document.getElementById("result");
const predictionText = document.getElementById("prediction");
let session = null;

const labels = [
    "rose",
    "sunflower",
    "tulip",
]

// UPLOAD IMAGE AND PREVIEW
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


async function loadModel() {
    try {
        // Load the ONNX model
        session = await ort.InferenceSession.create('flower_classifier.onnx');
        console.log("Model loaded successfully");
    } catch (error) {
        console.error("Error loading model:", error);   
    }
}

loadModel();

// IDENTIFY BUTTON CLICK EVENT
idenfityButton.addEventListener("click", async () => {
    if (!preview.src) {
        console.log("No image selected", preview);
        alert("Veuillez choisir une image avant d'identifier !");
        return;
    }
    predictionText.textContent = 'Prédiction en cours...';
    result.classList.remove("hidden");

    try {
        // Preprocess the image from preview <img> element        
        const tensor = await preprocessImage(preview);
        console.log(tensor);
        
        // Run inference
        const feeds = {};
        feeds[session.inputNames[0]] = tensor;

        const results = await session.run(feeds);
        const output = results[session.outputNames[0]];
        console.log("Logits bruts :", output.data);
        let maxIdx = 0;
        let maxVal = output.data[0];

        for (let i = 1; i < output.data.length; i++) {
          if (output.data[i] > maxVal) {
            maxVal = output.data[i];
            maxIdx = i;
          }
        }

        predictionText.textContent = `🌸 ${labels[maxIdx]}`;
    } catch (error) {
        console.error(error);
        predictionText.textContent = "Erreur"
    }
});


async function preprocessImage(imageElement) {
    const size = 256; // <-- ici la correction
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;
    ctx.drawImage(imageElement, 0, 0, size, size);

    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    const float32Data = new Float32Array(size * size * 3);

    for (let i = 0; i < size * size; i++) {
        const r = data[i * 4] / 255;
        const g = data[i * 4 + 1] / 255;
        const b = data[i * 4 + 2] / 255;

        float32Data[i] = (r - 0.485) / 0.229;
        float32Data[i + size * size] = (g - 0.456) / 0.224;
        float32Data[i + 2 * size * size] = (b - 0.406) / 0.225;
    }

    return new ort.Tensor("float32", float32Data, [1, 3, size, size]);
}
