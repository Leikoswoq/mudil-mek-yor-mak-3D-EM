<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>3D Exhibition Booth</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      width: 100%;
      height: 100%;
      background: transparent;
    }
    #renderCanvas {
      width: 100%;
      height: 100%;
      display: block;
      background: transparent;
    }
  </style>
</head>
<body>
  <canvas id="renderCanvas"></canvas>

  <!-- Babylon.js CDN -->
  <script src="https://cdn.babylonjs.com/babylon.js"></script>
  <script src="https://cdn.babylonjs.com/loaders/babylon.glTF2FileLoader.min.js"></script>

  <script>
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // Transparent background

    BABYLON.SceneLoader.Append(
      "https://leikoswoq.github.io/mudil-mek-yor-mak-3D-EM/",
      "Exhibition-Booth-this.glb",
      scene,
      function () {
        console.log("✅ Model loaded");

        // Camera
        const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.8, 6, new BABYLON.Vector3(0, 1, 0), scene);
        camera.attachControl(canvas, true);
        camera.lowerBetaLimit = 0.1; // prevent rotating down too far
        camera.upperBetaLimit = Math.PI / 2; // prevent rotating below horizon

        // Ambient light (brighter)
        const ambient = new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(0, 1, 0), scene);
        ambient.intensity = 1.0;

        // Bright spotlight
        const spotlight = new BABYLON.SpotLight(
          "spotLight",
          new BABYLON.Vector3(0, 5, 0),
          new BABYLON.Vector3(0, -1, 0),
          Math.PI / 2.5,
          2,
          scene
        );
        spotlight.intensity = 4;
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

        engine.runRenderLoop(() => scene.render());
      },
      null,
      (scene, message, exception) => {
        console.error("❌ Model load failed:", message);
        console.error(exception);
      }
    );

    window.addEventListener("resize", () => engine.resize());
  </script>
</body>
</html>
