/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

const quadtree = (target: BABYLON.Vector3, origin: BABYLON.Vector3, size: float): [BABYLON.Vector3, float][] => {

    let result: [BABYLON.Vector3, float][] = [];

    if (BABYLON.Vector3.DistanceSquared(target, origin) < (size * 2.0) ** 2 && size > 32) {

        const half: float = size / 2;
        const quarter: float = half / 2;

        result = result.concat(quadtree(target, origin.clone().addInPlaceFromFloats(-quarter, 0, -quarter), half));
        result = result.concat(quadtree(target, origin.clone().addInPlaceFromFloats(quarter, 0, -quarter), half));
        result = result.concat(quadtree(target, origin.clone().addInPlaceFromFloats(-quarter, 0, quarter), half));
        result = result.concat(quadtree(target, origin.clone().addInPlaceFromFloats(quarter, 0, quarter), half));

    } else {

        result.push([origin, size]);
    }

    return result;
};