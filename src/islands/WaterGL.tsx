import { useEffect, useRef } from 'react';

export default function WaterGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.self !== window.top) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (document.documentElement.classList.contains('is-tina-edit')) return;
    const nav = navigator as any;
    if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4 && /Mobi|Android/i.test(navigator.userAgent)) {
      canvas.style.display = 'none';
      return;
    }
    const section = canvas.parentElement as HTMLElement | null;
    if (!section) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' }) as WebGLRenderingContext | null;
    if (!gl) {
      canvas.style.display = 'none';
      return;
    }

    const vs = `attribute vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }`;
    const fs = `precision mediump float;
uniform float uT; uniform vec2 uRes;
#define PI 3.14159265
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (uv - 0.5) * vec2(uRes.x/uRes.y, 1.0) * 2.0;
  float t = uT * 0.35;
  // 3 Gerstner-ish waves: h = sum A sin(dot(D,p)*k + t*s)
  // k=2pi/lambda, s=sqrt(g*k)*0.3, g=9.8
  vec2 D1=normalize(vec2(1.0,0.6)); float k1=1.1; float s1=0.99; float h1=0.22*sin(dot(D1,p)*k1 + t*s1);
  vec2 D2=normalize(vec2(-0.7,1.0)); float k2=2.3; float s2=1.43; float h2=0.12*sin(dot(D2,p)*k2 + t*s2*1.12 + 1.3);
  vec2 D3=normalize(vec2(0.9,-0.4)); float k3=3.8; float s3=1.83; float h3=0.06*sin(dot(D3,p)*k3 + t*s3*0.9 + 2.1);
  float h = h1+h2+h3;
  // analytic normal from dh
  float dhx = 0.22*k1*D1.x*cos(dot(D1,p)*k1 + t*s1) + 0.12*k2*D2.x*cos(dot(D2,p)*k2 + t*s2*1.12+1.3) + 0.06*k3*D3.x*cos(dot(D3,p)*k3 + t*s3*0.9+2.1);
  float dhy = 0.22*k1*D1.y*cos(dot(D1,p)*k1 + t*s1) + 0.12*k2*D2.y*cos(dot(D2,p)*k2 + t*s2*1.12+1.3) + 0.06*k3*D3.y*cos(dot(D3,p)*k3 + t*s3*0.9+2.1);
  vec3 N = normalize(vec3(-dhx*0.7, -dhy*0.7, 1.0));
  vec3 L = normalize(vec3(0.5,0.8,0.6));
  float diff = pow(max(dot(N,L),0.0),1.2)*0.55;
  float spec = pow(max(dot(reflect(-L,N), vec3(0.,0.,1.)),0.0), 32.0)*0.35;
  // depth/fresnel
  float depth = clamp((h+0.4)/0.8,0.,1.);
  vec3 deep = vec3(0.04,0.29,0.43); // #0C4A6E
  vec3 mid = vec3(0.0,0.467,0.714); // #0077B6
  vec3 shallow = vec3(0.73,0.90,0.99); // #BAE6FD
  vec3 base = mix(deep, mid, smoothstep(-0.2,0.3, h));
  base = mix(base, shallow, smoothstep(0.25,0.55, h)*0.45);
  // caustic shimmer: cheap 2 sines
  float ca = abs(sin(p.x*3.1 + t)* sin(p.y*2.7 - t*1.2));
  ca = pow(ca, 14.0)*1.8;
  vec3 caustic = vec3(0.65,0.95,0.99)*ca*0.42;
  // foam on crests
  float foam = smoothstep(0.32,0.45, h) * (0.5+0.5*sin(t*0.7 + p.x*2.0));
  base = mix(base, vec3(1.0), foam*0.0); // keep water, no white band - foam via brightness only
  base += diff*0.35 + spec*0.45 + caustic;
  // subtle vignette
  base *= 1.0 - 0.08*length(uv-0.5);
  gl_FragColor = vec4(base,1.0);
}`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vss = compile(gl.VERTEX_SHADER, vs);
    const fss = compile(gl.FRAGMENT_SHADER, fs);
    if (!vss || !fss) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vss);
    gl.attachShader(prog, fss);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const locP = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(locP);
    gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);
    const locT = gl.getUniformLocation(prog, 'uT');
    const locRes = gl.getUniformLocation(prog, 'uRes');

    let raf = 0;
    let start = performance.now();
    let last = start;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = section.clientWidth;
      const h = section.clientHeight;
      const rw = Math.max(1, Math.floor(w * 0.5 * dpr));
      const rh = Math.max(1, Math.floor(h * 0.5 * dpr));
      if (canvas.width !== rw || canvas.height !== rh) {
        canvas.width = rw;
        canvas.height = rh;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(locRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    window.addEventListener('resize', resize);

    const loop = () => {
      if (!running) return;
      const now = performance.now();
      const dt = Math.min(now - last, 33);
      last = now;
      void dt;
      const t = (now - start) / 1000;
      gl.uniform1f(locT, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver((entries) => {
      const vis = entries[0]?.isIntersecting && !document.hidden;
      if (vis && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
      if (!vis && running) { running = false; cancelAnimationFrame(raf); }
    }, { threshold: 0.01 });
    io.observe(section);

    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!running && io.takeRecords) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
    };
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      try { gl.getExtension('WEBGL_lose_context')?.loseContext(); } catch {}
    };
  }, []);
  return <canvas ref={canvasRef} className="cta-water-canvas" aria-hidden="true" />;
}
