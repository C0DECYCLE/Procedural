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

out vec3 normalPosition;
out float waveHeight;
out vec3 triPosition;

// Simplex 2D noise
//
vec3 permute(vec3 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}

float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main(void) {

    #include<instancesVertex>

    vec3 instanceWorldPosition = (finalWorld * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    vec3 vertexPosition = position;

    triPosition = vec3(snoise(permute(instanceWorldPosition + vertexPosition * 3642.0).xy * 9245.0), snoise(permute(instanceWorldPosition + vertexPosition * 9123.0).yz * 5551.0), snoise(permute(instanceWorldPosition + vertexPosition * 1726.0).xz * 6223.0));

    float maxHeight = 3.0;
    float noiseScale = 0.1;

    vertexPosition.xz *= size;

    waveHeight = (snoise((instanceWorldPosition.xz + vertexPosition.xz) * noiseScale + time * 0.0002) * 0.5 + 0.5);

    if (vertexPosition.y > 0.0) {

        vertexPosition.y = waveHeight * maxHeight;

    } else {
        
        vertexPosition.y = 0.0;
    }

    normalPosition = instanceWorldPosition + vertexPosition;

    gl_Position = viewProjection * finalWorld * vec4(vertexPosition, 1.0);
}