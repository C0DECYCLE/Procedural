/*
    Palto Studio
    Developed by Noah Bussinger
    2023
*/

const shaderIncludes = (names: string[]): void => {

    for (let i: int = 0; i < names.length; i++) {

        fetch(`/shaders/includes/${names[i]}.fx`)
            .then((response: Response): Promise<string> => response.text())
            .then((data: string) => BABYLON.ShaderStore.IncludesShadersStore[names[i]] = data);
    }
};