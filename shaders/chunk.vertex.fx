/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

precision highp float;

uniform mat4 viewProjection;

attribute vec3 position;
attribute float awake;
attribute float size;

#include<instancesDeclaration>

out vec3 instanceWorldPosition;
out vec3 vertexPosition;

#include<tesselate>

void main(void) {

    if (awake == 0.0) {

        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);

    } else if (awake == 1.0) {

        #include<instancesVertex>

        instanceWorldPosition = (finalWorld * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        vertexPosition = position;
        vertexPosition.xz *= size;

        vec3 finalPosition = tesselate(instanceWorldPosition, vertexPosition);

        gl_Position = viewProjection * finalWorld * vec4(finalPosition, 1.0);
    }
}