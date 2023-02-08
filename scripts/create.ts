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

    const subdivide = (target: BABYLON.Vector3, origin: BABYLON.Vector3, size: float, result: [BABYLON.Vector3, float][]): void => {

        if (BABYLON.Vector3.DistanceSquared(target, origin) < (size * 0.75) ** 2 && size > 32) {

            const half = size / 2;
            const quarter = half / 2;

            subdivide(target, origin.clone().addInPlaceFromFloats(-quarter, 0, -quarter), half, result);
            subdivide(target, origin.clone().addInPlaceFromFloats(quarter, 0, -quarter), half, result);
            subdivide(target, origin.clone().addInPlaceFromFloats(-quarter, 0, quarter), half, result);
            subdivide(target, origin.clone().addInPlaceFromFloats(quarter, 0, quarter), half, result);

        } else {

            result.push([origin, size]);
        }
    };

    const res: [BABYLON.Vector3, float][] = [];
    subdivide(new BABYLON.Vector3(), new BABYLON.Vector3(), 512, res);
    console.log(res.length);

    BABYLON.SceneLoader.LoadAssetContainer("/assets/", "chunk.obj", scene, (container: BABYLON.AssetContainer): void => {

        const mesh: BABYLON.AbstractMesh = container.meshes[0];

        if (mesh instanceof BABYLON.Mesh) {

            mesh.name = "chunk";
            mesh.id = mesh.name;
            mesh.material = chunkMaterial;
            mesh.alwaysSelectAsActiveMesh = true;

            mesh.thinInstanceRegisterAttribute("size", 1);

            for (let i: int = 0; i < res.length; i++) {

                const matrix: BABYLON.Matrix = BABYLON.Matrix.Translation(res[i][0].x, res[i][0].y, res[i][0].z);
                const index: int = mesh.thinInstanceAdd(matrix);

                mesh.thinInstanceSetAttributeAt("size", index, [res[i][1]]);
            }
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