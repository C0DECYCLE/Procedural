/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

float maxHeight = 128.0;
float noiseScale = 0.005;

#include<simplexNoise>

float heightmap(vec2 xzPosition) {

    //                              0.025                       16.0
    //return (snoise(xzPosition * noiseScale) * 0.5 + 0.5) * maxHeight;

    return (fbm((xzPosition + vec2(845.2, 236.9)) * noiseScale) * 0.5 + 0.5) * maxHeight;
}