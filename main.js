const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Tone mapping & contrast
scene.imageProcessingConfiguration.toneMappingEnabled = true;
scene.imageProcessingConfiguration.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;
scene.imageProcessingConfiguration.exposure = 1.2;
scene.imageProcessingConfiguration.contrast = 1.2;

// Background
scene.clearColor = new BABYLON.Color3(0, 0, 0); // pure black

// Camera
const camera = new BABYLON.ArcRotateCamera(
  "Camera",
  Math.PI / 2,
  Math.PI / 2.5,
  5,
  new BABYLON.Vector3(0, 1, 0),
  scene
);
camera.attachControl(canvas, true);

// Lights
const hemiLight = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
hemiLight.intensity = 0.6;

const spotLight = new BABYLON.SpotLight(
  "spot",
  new BABYLON.Vector3(0, 5, -5),
  new BABYLON.Vector3(0, -1, 1),
  Math.PI / 3,
  2,
  scene
);
spotLight.intensity = 1.8;

// Load model
BABYLON.SceneLoader.Append(
  "https://leikoswoq.github.io/mudil-mek-yor-mak-3D-EM/",
  "Exhibition-Booth-this.glb",
  scene,
  () => {
    console.log("✅ Model loaded");
    scene.createDefaultEnvironment({
      createSkybox: true,
      skyboxColor: new BABYLON.Color3.Black(),
      environmentTexture: BABYLON.CubeTexture.CreateFromPrefilteredData(
        "https://assets.babylonjs.com/environments/studio.env", scene
      ),
      skyboxSize: 1000,
      groundShadowLevel: 0.2,
    });

    engine.runRenderLoop(() => scene.render());
  },
  null,
  (scene, message, exception) => {
    console.error("❌ Load failed", message);
    console.error(exception);
  }
);

window.addEventListener("resize", () => engine.resize());
