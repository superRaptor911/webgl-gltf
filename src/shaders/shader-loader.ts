
const loadShader = async (gl: WebGL2RenderingContext, name: string, type: number) => {
    const response = await fetch(`/shaders/${name}`);
    const content = await response.text();

    const shader = gl.createShader(type);
    if (shader === null) throw new Error('gl.createShader returned null!');

    gl.shaderSource(shader, content);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
    }

    return shader;
};

const createProgram = (gl: WebGL2RenderingContext) => {
    const program = gl.createProgram();
    if (program === null) throw new Error('gl.createProgram returned null!');

    return program as WebGLProgram;
};

const linkProgram = (gl: WebGL2RenderingContext, program: WebGLProgram) => {
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);
};

export {
    loadShader,
    createProgram,
    linkProgram,
};
