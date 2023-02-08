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
    camera.speed = 10;

    BABYLON.SceneLoader.LoadAssetContainer("/assets/", "chunk.obj", scene, (container: BABYLON.AssetContainer): void => {

        const mesh: BABYLON.AbstractMesh = container.meshes[0];

        if (mesh instanceof BABYLON.Mesh) {

            chunkManager(mesh);
        }

        container.addAllToScene();
    });

    /*
    const pipeline: BABYLON.DefaultRenderingPipeline = new BABYLON.DefaultRenderingPipeline("pipeline", true, scene, [camera]);
    pipeline.samples = engine.getCaps().maxMSAASamples;
    pipeline.fxaaEnabled = true;
    pipeline.imageProcessingEnabled = false;
    */

    return scene;
};