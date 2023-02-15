/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

#include<heightmap>

vec3 tesselate(vec3 instanceWorldPosition, vec3 vertexPosition) {

    vec3 position = vertexPosition;

    if (position.y > 0.0) {

        vec2 xzPosition = instanceWorldPosition.xz + vertexPosition.xz;
        position.y = heightmap(xzPosition);

    } else {

        position.y = 0.0;
    }

    return position;
}