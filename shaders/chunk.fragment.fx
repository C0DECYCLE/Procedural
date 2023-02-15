/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

precision highp float;

in vec3 instanceWorldPosition;
in vec3 vertexPosition;

#include<tesselate>

void main(void) {

    vec3 finalPosition = tesselate(instanceWorldPosition, vertexPosition);

    vec3 dFdxPosition = vec3(dFdx(finalPosition.x), dFdx(finalPosition.y), dFdx(finalPosition.z));
    vec3 dFdyPosition = vec3(dFdy(finalPosition.x), dFdy(finalPosition.y), dFdy(finalPosition.z));
    vec3 faceNormal = normalize(cross(dFdxPosition, dFdyPosition));
    
    //gl_FragColor = vec4(faceNormal * 0.5 + 0.5, 1.0);

    /*
    vec3 lightDirection = vec3(1.0, 1.0, 1.0);
    vec3 lightDir = normalize(-lightDirection);  
    vec3 lightColor = vec3(0.9, 0.7, 0.8);
    float diff = max(dot(faceNormal, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;
    vec3 ambient = vec3(0.2, 0.1, 0.2);
    vec3 objectColor = vec3(0.1, 0.6, 0.3);

    gl_FragColor = vec4((ambient + diffuse) * objectColor, 1.0);
    */

    vec3 lightDirection = normalize(vec3(1.0, -1.0, 0.0));
    float lightAngle = max(dot(faceNormal, lightDirection), 0.0);
    vec3 finalColor = vec3(1.0, 1.0, 1.0) * lightAngle;

    gl_FragColor = vec4(finalColor, 1.0);
}