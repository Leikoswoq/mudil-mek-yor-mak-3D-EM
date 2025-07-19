const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Load the model
BABYLON.SceneLoader.Append(
  "https://leikoswoq.github.io/mudil-mek-yor-mak-3D-EM/",
  "Exhibition-Booth-this.glb",
  scene,
  () => {
    console.log("✅ Model loaded");

    // =============================
    // ✅ CAMERA + LIGHTING PRESET
    // =============================

    // Camera
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.8, 6, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);

    // Ambient light
    const ambient = new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(0, 1, 0), scene);
    ambient.intensity = 0.3;

    // Spotlight
    const spotlight = new BABYLON.SpotLight(
      "spotLight",
      new BABYLON.Vector3(0, 5, 0),
      new BABYLON.Vector3(0, -1, 0),
      Math.PI / 3,
      2,
      scene
    );
    spotlight.intensity = 2;
    spotlight.shadowEnabled = true;

    // Environment
    scene.createDefaultEnvironment({
      createSkybox: false,
      createGround: false,
      environmentTexture: BABYLON.CubeTexture.CreateFromPrefilteredData(
        "https://assets.babylonjs.com/environments/studio.env",
        scene
      ),
    });

    scene.clearColor = new BABYLON.Color3(0, 0, 0); // black background

    // =============================

    engine.runRenderLoop(() => scene.render());
  },
  null,
  (scene, message, exception) => {
    console.error("❌ Load failed", message);
    console.error(exception);
  }
);

window.addEventListener("resize", () => engine.resize());
