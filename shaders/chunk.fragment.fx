/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

precision highp float;

//in vec3 normalPosition;
//in float waveHeight;
in vec3 triPosition;

void main(void) {

    //vec3 dFdxPosition = vec3(dFdx(normalPosition.x), dFdx(normalPosition.y), dFdx(normalPosition.z));
    //vec3 dFdyPosition = vec3(dFdy(normalPosition.x), dFdy(normalPosition.y), dFdy(normalPosition.z));
    //vec3 faceNormal = normalize(cross(dFdxPosition, dFdyPosition));
    
    //vec3 normalColor = faceNormal * 0.5 + 0.5;

    //vec3 waterHighColor = vec3(0.28, 1.0, 0.94);
    //vec3 waterDeepColor = vec3(0.03, 0.24, 0.38);
    //float waterDepth = 1.0 - waveHeight;//
    //vec3 waterColor = mix(waterHighColor, waterDeepColor, waterDepth);

    //if (waterDepth < 0.2) {
    
    //    waterColor = vec3(1.0, 1.0, 1.0);
    //}

    //gl_FragColor = vec4(mix(waterColor, normalColor, 0.5), 1.0);
    //gl_FragColor = vec4(waterColor, 1.0);

    vec3 dFdxPosition = vec3(dFdx(triPosition.x), dFdx(triPosition.y), dFdx(triPosition.z));
    vec3 dFdyPosition = vec3(dFdy(triPosition.x), dFdy(triPosition.y), dFdy(triPosition.z));
    vec3 triColor = normalize(cross(dFdxPosition, dFdyPosition));
    
    gl_FragColor = vec4(triColor * 0.5 + 0.5, 1.0);
}