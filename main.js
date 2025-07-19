// Get the canvas
const canvas = document.getElementById("renderCanvas");

// Create Babylon engine and scene
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Add an arc rotate camera
const camera = new BABYLON.ArcRotateCamera(
  "Camera",
  Math.PI / 2,
  Math.PI / 2.5,
  10,
  BABYLON.Vector3.Zero(),
  scene
);
camera.attachControl(canvas, true);

// Add a hemispheric light
const light = new BABYLON.HemisphericLight(
  "light",
  new BABYLON.Vector3(0, 1, 0),
  scene
);
light.intensity = 1.2;

// Debug log
console.log("🔄 Attempting to load model from GitHub raw URL...");

// Load your model from GitHub raw URL
BABYLON.SceneLoader.Append(
  "https://raw.githubusercontent.com/leikoswoq/mudil-mek-yor-mak-3D-EM/main/",
  "Exhibition-Booth-this.glb",
  scene,
  function () {
    console.log("✅ Model loaded via raw URL!");
    engine.runRenderLoop(() => scene.render());
  },
  null,
  function (scene, message, exception) {
    console.error("❌ Load failed:", message, exception);

    // Show visible error on screen
    const errorDiv = document.createElement("div");
    errorDiv.innerText = "Failed to load 3D model. See console for details.";
    errorDiv.style.position = "absolute";
    errorDiv.style.top = "20px";
    errorDiv.style.left = "20px";
    errorDiv.style.background = "#900";
    errorDiv.style.color = "white";
    errorDiv.style.padding = "1em";
    document.body.appendChild(errorDiv);
  }
);

// Resize engine on window resize
window.addEventListener("resize", () => {
  engine.resize();
});
