/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

precision highp float;

uniform mat4 viewProjection;
uniform float time;

attribute vec3 position;
attribute float size;

#include<instancesDeclaration>

//out vec3 normalPosition;
//out float waveHeight;
out vec3 triPosition;

#include<simplexNoise>

void main(void) {

    #include<instancesVertex>

    vec3 instanceWorldPosition = (finalWorld * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    vec3 vertexPosition = position;

    triPosition = vec3(snoise(permute(instanceWorldPosition + vertexPosition * 3642.0).xy * 9245.0), snoise(permute(instanceWorldPosition + vertexPosition * 9123.0).yz * 5551.0), snoise(permute(instanceWorldPosition + vertexPosition * 1726.0).xz * 6223.0));

    float maxHeight = 10.0;
    float noiseScale = 0.05;

    vertexPosition.xz *= size;

    //waveHeight = (snoise((instanceWorldPosition.xz + vertexPosition.xz) * noiseScale + time * 0.0002) * 0.5 + 0.5);
    float waveHeight = (snoise((instanceWorldPosition.xz + vertexPosition.xz) * noiseScale + time * 0.0002) * 0.5 + 0.5);

    if (vertexPosition.y > 0.0) {

        vertexPosition.y = waveHeight * maxHeight;

    } else {

        vertexPosition.y = 0.0;
    }

    //normalPosition = instanceWorldPosition + vertexPosition;

    gl_Position = viewProjection * finalWorld * vec4(vertexPosition, 1.0);
}