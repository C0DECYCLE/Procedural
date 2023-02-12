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
    
    vec3 lightDirection = vec3(1.0, 1.0, 1.0);
    vec3 lightDir = normalize(-lightDirection);  
    vec3 lightColor = vec3(0.9, 0.7, 0.8);
    float diff = max(dot(faceNormal, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;
    vec3 ambient = vec3(0.2, 0.1, 0.2);
    vec3 objectColor = vec3(0.1, 0.6, 0.3);

    gl_FragColor = vec4((ambient + diffuse) * objectColor, 1.0);
    //gl_FragColor = vec4(faceNormal * 0.5 + 0.5, 1.0);
}