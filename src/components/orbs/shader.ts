export default class Shader {
    frag = '';
    vert = '';
    audio = 0;
  
    canvas: HTMLCanvasElement;
    program: WebGLProgram | null = null;
    gl: WebGLRenderingContext | null = null;
    start = performance.now();
    vertices = [-1, -1, 1, -1, -1, 1, 1, 1];
    vertexBuffer: WebGLBuffer | null = null;
  
    constructor(canvas: HTMLCanvasElement, vert: string, frag: string) {
      this.canvas = canvas;
      this.vert = vert;
      this.frag = frag;
      this.gl = this.canvas.getContext('webgl');
      // window.addEventListener('resize', this.resizeCanvas.bind(this));
      if (!this.gl) {
        console.error('WebGL is not supported in this browser.');
        return;
      }
      this.gl.disable(this.gl.DEPTH_TEST);
      // this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.blendFuncSeparate(
        this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA,
        this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA
      );
      this.gl.enable(this.gl.BLEND);
      this.vertexBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
      this.start = performance.now();
  
      this.onShaderChange(this.vert, this.frag);
    }
  
    resizeCanvas() {
      if (!this.canvas) {
        return;
      }
      // if (this.canvas.parentElement) {
      //   this.canvas.width = this.canvas.parentElement.clientWidth;
      //   this.canvas.height = this.canvas.parentElement.clientHeight;
      // } else if (typeof window !== 'undefined') {
      //   this.canvas.width = window.innerWidth;
      //   this.canvas.height = window.innerHeight;
      // }
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
      if (this.gl && this.program) {
        const res = this.gl.getUniformLocation(this.program, 'resolution');
        this.gl.uniform2f(res, this.canvas.width, this.canvas.height);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  
    async onShaderChange(vert: string, frag: string) {
      this.vert = vert;
      this.frag = frag;
      if (!this.frag) this.frag = 'precision mediump float;void main() {gl_FragColor=vec4(1, 0, 1, 1);}';
      else {
        this.frag = frag;
        if (this.frag.endsWith(".frag")) {
          let r = await fetch(this.frag);
          let t = await r.text();
          this.frag = t;
        }
      }
      if (!this.vert) this.vert = 'attribute vec4 a_position;void main() {gl_Position = a_position;}';
      else {
        this.vert = vert;
        if (this.vert.endsWith(".vert")) {
          let r = await fetch(this.vert);
          let t = await r.text();
          this.vert = t;
        }
      }
      if (!this.gl) return;
  
      const fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
      if (!fs) {
        alert('Could not create fragment shader');
        return;
      }
      this.gl.shaderSource(fs, this.frag);
      this.gl.compileShader(fs);
      if (!this.gl.getShaderParameter(fs, this.gl.COMPILE_STATUS)) {
        const errorLog = this.gl.getShaderInfoLog(fs);
        console.error('Fragment shader compilation error:', errorLog);
      }
  
      const vs = this.gl.createShader(this.gl.VERTEX_SHADER);
      if (!vs) {
        alert('Could not create vertex shader');
        return;
      }
      this.gl.shaderSource(vs, this.vert);
      this.gl.compileShader(vs);
      if (!this.gl.getShaderParameter(vs, this.gl.COMPILE_STATUS)) {
        const errorLog = this.gl.getShaderInfoLog(vs);
        console.error('Vertex shader compilation error:', errorLog);
      }
  
      if (this.program) {
        this.gl.deleteProgram(this.program);
        this.program = null;
      }
      this.program = this.gl.createProgram();
      if (!this.program) {
        alert('Could not create shader program');
        return;
      }
      this.gl.attachShader(this.program, fs);
      this.gl.attachShader(this.program, vs);
      this.gl.linkProgram(this.program);
      this.gl.deleteShader(fs);
      this.gl.deleteShader(vs);
  
      this.gl.useProgram(this.program);
      const positionAttribute = this.gl.getAttribLocation(this.program, 'a_position');
      this.gl.enableVertexAttribArray(positionAttribute);
      this.gl.vertexAttribPointer(positionAttribute, 2, this.gl.FLOAT, false, 0, 0);
  
      this.resizeCanvas();
  
      this.render();
    }
  
    render() {
      if (!(this.canvas && this.gl && this.program)) return;
      // this.gl.clearColor(1, 1, 1, 0);
      // this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.useProgram(this.program);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      const time = this.gl.getUniformLocation(this.program, 'time');
      if (time) this.gl.uniform1f(time, (performance.now() - this.start) / 1000);
      const sfx = this.gl.getUniformLocation(this.program, 'audio');
      if (sfx) this.gl.uniform1f(sfx, this.audio);
      requestAnimationFrame(this.render.bind(this));
    }
  }