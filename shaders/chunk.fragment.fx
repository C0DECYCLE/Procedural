/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

precision highp float;

in vec3 normalPosition;

void main(void) {

    vec3 dFdxPosition = vec3(dFdx(normalPosition.x), dFdx(normalPosition.y), dFdx(normalPosition.z));
    vec3 dFdyPosition = vec3(dFdy(normalPosition.x), dFdy(normalPosition.y), dFdy(normalPosition.z));
    vec3 faceNormal = normalize(cross(dFdxPosition, dFdyPosition));
    
    gl_FragColor = vec4(faceNormal * 0.5 + 0.5, 1.0);
}