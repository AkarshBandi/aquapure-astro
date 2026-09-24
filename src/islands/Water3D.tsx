import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Water3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.self !== window.top) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (document.documentElement.classList.contains('is-tina-edit')) return;

    const section = mount.parentElement as HTMLElement | null;
    if (!section) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    const geo = new THREE.PlaneGeometry(2, 2, 128, 128);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uT: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float uT;
        void main(){
          vUv = uv;
          vec3 p = position;
          float t = uT * 0.35;
          float h = 0.0;
          // 3 Gerstner waves for vertex displacement
          float k1=1.1; float s1=0.99; vec2 D1=vec2(0.85,0.5);
          float k2=2.3; float s2=1.43; vec2 D2=vec2(-0.6,0.85);
          float k3=3.8; float s3=1.83; vec2 D3=vec2(0.7,-0.55);
          h += 0.08 * sin(dot(D1, p.xy)*k1 + t*s1);
          h += 0.045 * sin(dot(D2, p.xy)*k2 + t*s2*1.12 + 1.3);
          h += 0.025 * sin(dot(D3, p.xy)*k3 + t*s3*0.9 + 2.1);
          p.z += h * 0.15;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uT;
        uniform vec2 uRes;
        void main(){
          vec2 uv = vUv;
          vec2 p = (uv - 0.5) * 2.0;
          p.x *= uRes.x / uRes.y;
          float t = uT * 0.35;
          // height field same as vertex
          float k1=1.1; float s1=0.99; vec2 D1=vec2(0.85,0.5);
          float k2=2.3; float s2=1.43; vec2 D2=vec2(-0.6,0.85);
          float k3=3.8; float s3=1.83; vec2 D3=vec2(0.7,-0.55);
          float h = 0.08*sin(dot(D1,p)*k1 + t*s1) + 0.045*sin(dot(D2,p)*k2 + t*s2*1.12+1.3) + 0.025*sin(dot(D3,p)*k3 + t*s3*0.9+2.1);
          float dhx = 0.08*k1*D1.x*cos(dot(D1,p)*k1 + t*s1) + 0.045*k2*D2.x*cos(dot(D2,p)*k2 + t*s2*1.12+1.3) + 0.025*k3*D3.x*cos(dot(D3,p)*k3 + t*s3*0.9+2.1);
          float dhy = 0.08*k1*D1.y*cos(dot(D1,p)*k1 + t*s1) + 0.045*k2*D2.y*cos(dot(D2,p)*k2 + t*s2*1.12+1.3) + 0.025*k3*D3.y*cos(dot(D3,p)*k3 + t*s3*0.9+2.1);
          vec3 N = normalize(vec3(-dhx*2.0, -dhy*2.0, 1.0));
          vec3 L = normalize(vec3(0.4,0.7,0.6));
          float diff = pow(max(dot(N,L),0.0),1.2)*0.5;
          float spec = pow(max(dot(reflect(-L,N), vec3(0.,0.,1.)),0.0), 48.0)*0.6;
          float depth = clamp((h+0.12)/0.24,0.,1.);
          vec3 deep = vec3(0.04,0.29,0.43);
          vec3 mid = vec3(0.0,0.467,0.714);
          vec3 shallow = vec3(0.73,0.90,0.99);
          vec3 base = mix(deep, mid, smoothstep(-0.08,0.12, h));
          base = mix(base, shallow, smoothstep(0.08,0.18, h)*0.35);
          float ca = abs(sin(p.x*3.1 + t)* sin(p.y*2.7 - t*1.2));
          ca = pow(ca, 18.0)*2.0;
          vec3 caustic = vec3(0.65,0.95,0.99)*ca*0.35;
          base += diff*0.3 + spec*0.5 + caustic;
          base = mix(base, vec3(0.02,0.15,0.28), 0.15*depth);
          // foam via crest
          // no white band - keep water only
          float alpha = 1.0;
          // wavy alpha at top/bottom edges is handled by clipPath, not here
          gl_FragColor = vec4(base, alpha * 0.96);
        }
      `,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const onResize = () => {
      const w = section.clientWidth;
      const h = section.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
      renderer.setSize(w * dpr, h * dpr, false);
      renderer.domElement.style.width = w + 'px';
      renderer.domElement.style.height = h + 'px';
      mat.uniforms.uRes.value.set(w * dpr, h * dpr);
    };
    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(section);
    window.addEventListener('resize', onResize);

    let raf = 0;
    let running = true;
    const start = performance.now();
    const loop = () => {
      if (!running) return;
      mat.uniforms.uT.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver((entries) => {
      const vis = entries[0]?.isIntersecting && !document.hidden;
      if (vis && !running) { running = true; raf = requestAnimationFrame(loop); }
      if (!vis && running) { running = false; cancelAnimationFrame(raf); }
    }, { threshold: 0.01 });
    io.observe(section);
    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!running) { running = true; raf = requestAnimationFrame(loop); }
    };
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      try { mount.removeChild(renderer.domElement); } catch {}
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      try { (renderer as any).forceContextLoss?.(); } catch {}
    };
  }, []);
  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }} aria-hidden="true" />;
}
