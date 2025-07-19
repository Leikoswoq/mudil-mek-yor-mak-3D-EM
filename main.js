// Get the canvas element from the HTML
const canvas = document.getElementById("renderCanvas");

// Create Babylon engine and scene
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Create a basic camera and attach it to the canvas
const camera = new BABYLON.ArcRotateCamera(
  "Camera",
  Math.PI / 2,
  Math.PI / 2.8,
  10,
  BABYLON.Vector3.Zero(),
  scene
);
camera.attachControl(canvas, true);

// Add a simple light
const light = new BABYLON.HemisphericLight(
  "light",
  new BABYLON.Vector3(0, 1, 0),
  scene
);
light.intensity = 1.2;

// Show a log to confirm start
console.log("🔄 Attempting to load model...");

// Load your .glb model from GitHub
BABYLON.SceneLoader.Append(
  "https://leikoswoq.github.io/mudil-mek-yor-mak-3D-EM/", // model folder
  "Exhibition-Booth-this.glb", // model file
  scene,
  function () {
    console.log("✅ Model loaded successfully.");
    engine.runRenderLoop(() => scene.render());
  },
  null,
  function (scene, message, exception) {
    // Handle loading error
    console.error("❌ MODEL LOAD FAILED");
    console.error("🛠️ Message:", message);
    console.error("📄 Exception:", exception);

    // Optional: show visible error on screen
    const errorMessage = document.createElement("div");
    errorMessage.innerText = "Failed to load 3D model. Check console for error.";
    errorMessage.style.position = "absolute";
    errorMessage.style.color = "white";
    errorMessage.style.background = "#900";
    errorMessage.style.padding = "1em";
    errorMessage.style.top = "20px";
    errorMessage.style.left = "20px";
    document.body.appendChild(errorMessage);
  }
);

// Resize the engine on window resize
window.addEventListener("resize", () => engine.resize());
