/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

const chunkMaterial = (scene: BABYLON.Scene): BABYLON.ShaderMaterial => {

    const material: BABYLON.ShaderMaterial = new BABYLON.ShaderMaterial("chunkMaterial", scene, "/shaders/chunk", {
        attributes: ["position", "awake", "size"],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "viewProjection"]
    });

    return material;
};