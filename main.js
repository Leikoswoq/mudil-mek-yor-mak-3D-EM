const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Camera setup
const camera = new BABYLON.ArcRotateCamera(
  "Camera",
  Math.PI / 2,
  Math.PI / 3,
  10,
  BABYLON.Vector3.Zero(),
  scene
);
camera.attachControl(canvas, true);

// Lighting
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 1.2;

// ✅ Load your .glb model from GitHub Pages
BABYLON.SceneLoader.Append(
  "https://leikoswoq.github.io/mudil-mek-yor-mak-3D-EM/",
  "Exhibition-Booth-this.glb",
  scene,
  function () {
    console.log("✅ Model loaded successfully!");
    engine.runRenderLoop(() => scene.render());
  },
  null,
  function (scene, message, exception) {
    console.error("❌ MODEL LOAD FAILED");
    console.error("🛠️ Message:", message);
    console.error("📄 Exception:", exception);
  }
);

// Resize
window.addEventListener("resize", () => {
  engine.resize();
});
