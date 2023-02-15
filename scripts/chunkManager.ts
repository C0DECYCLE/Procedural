/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

let freeze: boolean = false;

const chunkManager = (mesh: BABYLON.Mesh): void => {

    const scene: BABYLON.Scene = mesh.getScene();

    mesh.name = "chunk";
    mesh.id = mesh.name;
    mesh.material = chunkMaterial(scene);
    mesh.alwaysSelectAsActiveMesh = true;

    mesh.thinInstanceRegisterAttribute("awake", 1);
    mesh.thinInstanceRegisterAttribute("size", 1);

    const area = 1024;
    const budget: int = ((area / 32) ** 2) / 2;
    const indexes: int[] = [];
    const identity: BABYLON.Matrix = BABYLON.Matrix.Identity();

    for (let i: int = 0; i < budget; i++) {

        const index: int = mesh.thinInstanceAdd(identity);

        mesh.thinInstanceSetAttributeAt("awake", index, [0]);
        mesh.thinInstanceSetAttributeAt("size", index, [0]);

        indexes.push(index);
    }

    scene.onBeforeRenderObservable.add((): void => {

        if (freeze) return;

        const chunks: [BABYLON.Vector3, float][] = quadtree(scene.cameras[0].position, new BABYLON.Vector3(), area);

        if (chunks.length > budget) {
            log("out of budget!", chunks.length, "/", budget);
        }

        for (let i: int = 0; i < indexes.length; i++) {

            if (i < chunks.length) {

                mesh.thinInstanceSetAttributeAt("awake", indexes[i], [1]);
                mesh.thinInstanceSetMatrixAt(indexes[i], BABYLON.Matrix.Translation(chunks[i][0].x, chunks[i][0].y, chunks[i][0].z));
                mesh.thinInstanceSetAttributeAt("size", indexes[i], [chunks[i][1]]);

            } else {

                mesh.thinInstanceSetAttributeAt("awake", indexes[i], [0]);
            }
        }
    });
};