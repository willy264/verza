import React, { useEffect, useRef } from "react";

interface GooeyTransitionProps {
  scrollProgress: number;
  color?: [number, number, number];
  opacity?: number;
}

const GooeyTransition: React.FC<GooeyTransitionProps> = ({
  scrollProgress = 0,
  color = [0.235, 0.635, 0.062],
  opacity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation>>({});
  const animationIdRef = useRef<number | undefined>(undefined);

  const vertShader = `
    precision mediump float;
    varying vec2 vUv;
    attribute vec2 a_position;
    void main() {
      vUv = a_position;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragShader = `
    precision mediump float;
    varying vec2 vUv;
    uniform vec2 u_resolution;
    uniform float u_scroll_progr;
    uniform float u_col_width;
    uniform float u_seed;
    uniform float u_scale;
    uniform float u_time;
    uniform float u_speed;
    uniform float u_opacity;
    uniform vec3 u_color;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float get_l(vec2 v) {
      return 1.0 - clamp(0.0, 1.0, length(v));
    }

    float rand(float n) {
      return fract(sin(n) * 43758.5453123);
    }

    void main() {
      float scale = 0.001 * u_scale;
      float speed = 0.001 * u_speed;

      vec2 uv = vUv;
      uv.x *= (scale * u_resolution.x);

      vec2 noise_uv = uv;
      noise_uv *= 5.0;
      noise_uv.y *= (0.25 * scale * u_resolution.y);
      noise_uv += vec2(0.0, u_time * 1.5 * speed);
      float shape = 0.0;
      shape += snoise(noise_uv);
      shape = clamp(0.5 + 0.5 * shape, 0.0, 1.0);
      shape *= pow(0.5 * uv.y + 0.7 + pow(u_scroll_progr, 2.0) + (0.4 * u_scroll_progr * (1.0 - pow(vUv.x - 0.2, 2.0))), 10.0);
      shape = clamp(shape, 0.0, 1.0);

      float dots = 0.0;
      float bars = 0.0;
      float light = 0.0;

      const int num_col = 9;
      for (int i = 0; i < num_col; i++) {
        vec2 col_uv = vUv;
        float start_time_offset = rand(100.0 * (float(i) + u_seed));
        float c_t = fract(u_time * speed + start_time_offset);
        float drop_time = 0.2 + 0.6 * rand(10.0 * (float(i) + u_seed));

        float before_drop_normal = c_t / drop_time;
        float before_drop_t = pow(before_drop_normal, 0.4) * drop_time;
        float after_drop_normal = max(0.0, c_t - drop_time) / (1.0 - drop_time);
        float after_drop_t_dot = 3.0 * pow(after_drop_normal, 2.0) * (1.0 - drop_time);
        float after_drop_t_bar = pow(after_drop_normal, 2.0) * (drop_time);

        float eased_drop_t = step(c_t, drop_time) * before_drop_t;
        eased_drop_t += step(drop_time, c_t) * (drop_time + after_drop_t_dot);

        col_uv.y += (1.0 + 3.0 * rand(15.0 * float(i))) * u_scroll_progr;
        col_uv.x *= (u_resolution.x / u_resolution.y);
        col_uv *= (7.0 * scale * u_resolution.y);
        col_uv.x += (u_col_width * (0.5 * float(num_col) - float(i)));

        vec2 dot_uv = col_uv;
        dot_uv.y += 4.0 * (eased_drop_t - 0.5);
        float dot = get_l(dot_uv);
        dot = pow(dot, 4.0);
        float drop_grow = step(c_t, drop_time) * pow(before_drop_normal, 0.4);
        drop_grow += step(drop_time, c_t) * mix(1.0, 0.8, clamp(7.0 * after_drop_normal, 0.0, 1.0));
        dot *= drop_grow;
        dot *= step(0.5, drop_time);
        dots += dot;

        vec2 bar_uv = col_uv;
        bar_uv.y += step(c_t, drop_time) * 4.0 * (before_drop_t - 0.5);
        bar_uv.y += step(drop_time, c_t) * 4.0 * (drop_time - after_drop_t_bar - 0.5);
        float bar = smoothstep(-0.5, 0.0, bar_uv.x) * (1.0 - smoothstep(0.0, 0.5, bar_uv.x));
        bar = pow(bar, 4.0);
        light += bar * smoothstep(0.0, 0.1, -bar_uv.x);
        float bar_mask = smoothstep(-0.2, 0.2, bar_uv.y);
        bar *= bar_mask;
        bars += bar;
      }

      shape += bars;
      shape = clamp(shape, 0.0, 1.0);
      shape += dots;

      float gooey = smoothstep(0.48, 0.5, shape);
      gooey -= 0.1 * smoothstep(0.5, 0.6, shape);
      vec3 color = u_color;
      color.r += 0.2 * (1.0 - vUv.y) * (1.0 - u_scroll_progr);
      color *= gooey;
      color = mix(color, vec3(1.0), max(0.0, 1.0 - 2.0 * vUv.y) * light * smoothstep(0.1, 0.7, snoise(0.5 * uv)) * (smoothstep(0.49, 0.6, shape) - smoothstep(0.6, 1.0, shape)));

      gl_FragColor = vec4(color, gooey * u_opacity);
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext);
    if (!gl) {
      console.warn("WebGL not supported");
      return;
    }

    glRef.current = gl;

    const createShader = (sourceCode: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, sourceCode);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(vertShader, gl.VERTEX_SHADER);
    const fragmentShader = createShader(fragShader, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const getUniforms = (program: WebGLProgram) => {
      const uniforms: Record<string, WebGLUniformLocation> = {};
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const name = gl.getActiveUniform(program, i)?.name;
        if (name) {
          uniforms[name] = gl.getUniformLocation(program, name)!;
        }
      }
      return uniforms;
    };

    uniformsRef.current = getUniforms(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(
        uniformsRef.current.u_resolution,
        canvas.width,
        canvas.height
      );
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    gl.uniform1f(uniformsRef.current.u_col_width, 0.7);
    gl.uniform1f(uniformsRef.current.u_speed, 0.2);
    gl.uniform1f(uniformsRef.current.u_scale, 0.25);
    gl.uniform1f(uniformsRef.current.u_seed, 0.231);
    gl.uniform3f(uniformsRef.current.u_color, color[0], color[1], color[2]);

    let startTime = performance.now();

    const render = () => {
      const currentTime = (performance.now() - startTime) / 1000;
      gl.uniform1f(uniformsRef.current.u_time, currentTime);
      gl.uniform1f(uniformsRef.current.u_scroll_progr, scrollProgress);
      gl.uniform1f(uniformsRef.current.u_opacity, opacity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationIdRef.current = requestAnimationFrame(render);
    };

    animationIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [color, opacity, scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none"
      style={{ display: "block" }}
    />
  );
};

export default GooeyTransition;
