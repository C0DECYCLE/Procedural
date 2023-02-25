/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

window.addEventListener("compile", (_event: Event): void => {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    document.body.appendChild(canvas);

    const engine: BABYLON.Engine = new BABYLON.Engine(
        canvas,
        true,
        undefined,
        true
    );
    const scene: BABYLON.Scene = create(engine);
    scene.debugLayer.show({ embedMode: true });

    //engine.setHardwareScalingLevel(1 / 2);
    engine.runRenderLoop((): void => {
        scene.render();
    });

    window.addEventListener("resize", (): void => {
        engine.resize();
    });
});
