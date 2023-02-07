/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

const create = (engine: BABYLON.Engine): BABYLON.Scene => {

    const scene: BABYLON.Scene = new BABYLON.Scene(engine);

    const camera: BABYLON.FreeCamera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 10, -20), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(engine.getRenderingCanvas(), true);

    const chunkMaterial: BABYLON.ShaderMaterial = new BABYLON.ShaderMaterial("chunk", scene, "/shaders/chunk", {
        attributes: ["position", "size"],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "viewProjection", "time"]
    });

    const startNow: float = performance.now();

    scene.registerBeforeRender((): void => {

        chunkMaterial.setFloat("time", performance.now() - startNow);
    });

    BABYLON.SceneLoader.LoadAssetContainer("/assets/", "chunk.obj", scene, (container: BABYLON.AssetContainer): void => {

        const mesh: BABYLON.AbstractMesh = container.meshes[0];

        if (mesh instanceof BABYLON.Mesh) {

            mesh.name = "chunk";
            mesh.id = mesh.name;
            mesh.material = chunkMaterial;
            mesh.alwaysSelectAsActiveMesh = true;

            const numPerSide: int = 8;
            const size: int = 16;
            const sizeAndSpacing: int = size + 2;

            mesh.thinInstanceRegisterAttribute("size", 1);

            for (let x: int = 0; x < numPerSide; x++) {

                for (let z: int = 0; z < numPerSide; z++) {

                    const matrix: BABYLON.Matrix = BABYLON.Matrix.Translation(sizeAndSpacing * x - sizeAndSpacing * numPerSide * 0.5, 0, sizeAndSpacing * z - sizeAndSpacing * numPerSide * 0.5);
                    const index: int = mesh.thinInstanceAdd(matrix);

                    mesh.thinInstanceSetAttributeAt("size", index, [size]);
                }
            }
        }

        container.addAllToScene();
    });

    const pipeline: BABYLON.DefaultRenderingPipeline = new BABYLON.DefaultRenderingPipeline("pipeline", true, scene, [camera]);
    pipeline.samples = engine.getCaps().maxMSAASamples;
    pipeline.fxaaEnabled = true;
    pipeline.imageProcessingEnabled = false;

    return scene;
};