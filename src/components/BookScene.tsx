import { useEffect, useRef } from "react";
import * as THREE from "three";

function tokenColor(token: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.Color();
  context.fillStyle = value;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
}

export default function BookScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 11);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const cover = tokenColor("--book-cover");
    const coverDeep = tokenColor("--book-cover-deep");
    const gold = tokenColor("--book-gold");
    const paper = tokenColor("--book-paper");
    const group = new THREE.Group();
    scene.add(group);

    const material = (color: THREE.Color, roughness = 0.5, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
    const pages = new THREE.Mesh(new THREE.BoxGeometry(3.42, 4.66, 0.46), material(paper, 0.86));
    pages.position.set(0.08, 0, -0.02);
    group.add(pages);
    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.34, 4.95, 0.76), material(coverDeep, 0.42));
    spine.position.set(-1.69, 0, 0.06);
    group.add(spine);
    const back = new THREE.Mesh(new THREE.BoxGeometry(3.74, 4.96, 0.12), material(coverDeep, 0.4));
    back.position.z = -0.32;
    group.add(back);
    const front = new THREE.Mesh(new THREE.BoxGeometry(3.76, 4.98, 0.13), material(cover, 0.36));
    front.position.z = 0.32;
    group.add(front);
    const trimMaterial = material(gold, 0.22, 0.65);
    const addBar = (w: number, h: number, x: number, y: number, z = 0.399) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.018), trimMaterial);
      bar.position.set(x, y, z);
      group.add(bar);
    };
    addBar(3.21, 0.015, 0, 2.12);
    addBar(3.21, 0.015, 0, -2.12);
    addBar(0.015, 4.26, -1.6, 0);
    addBar(0.015, 4.26, 1.6, 0);
    addBar(2.87, 0.012, 0, 1.82);
    addBar(2.87, 0.012, 0, -1.82);
    addBar(0.012, 3.64, -1.43, 0);
    addBar(0.012, 3.64, 1.43, 0);
    const circle = new THREE.Mesh(new THREE.TorusGeometry(0.53, 0.015, 8, 80), trimMaterial);
    circle.position.set(0, 0.72, 0.42);
    group.add(circle);
    const crest = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), trimMaterial);
    crest.position.set(0, 0.72, 0.44);
    crest.rotation.z = Math.PI / 4;
    group.add(crest);

    const label = document.createElement("canvas");
    label.width = 1024;
    label.height = 1024;
    const ctx = label.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 1024, 1024);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--book-gold").trim();
      ctx.textAlign = "center";
      ctx.font = "bold 44px Georgia, serif";
      ctx.fillText("THE LEARNING", 512, 495);
      ctx.font = "bold 90px Georgia, serif";
      ctx.fillText("ROOM", 512, 595);
      ctx.font = "26px Georgia, serif";
      ctx.fillText("LEARN  ·  GROW  ·  SUCCEED", 512, 735);
      ctx.font = "22px Georgia, serif";
      ctx.fillText("EST. IN BOKARO", 512, 910);
      const texture = new THREE.CanvasTexture(label);
      texture.colorSpace = THREE.SRGBColorSpace;
      const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.73, 4.95), new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false }));
      textMesh.position.z = 0.415;
      group.add(textMesh);
    }

    const light = new THREE.DirectionalLight(paper, 3.2);
    light.position.set(-3, 5, 8);
    scene.add(light);
    const rim = new THREE.DirectionalLight(gold, 2.5);
    rim.position.set(4, -2, -1);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(paper, 1.15));

    let width = 0;
    let height = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scrollY = 0;
    let frame = 0;
    let dragged = false;
    let dragStart = 0;
    let dragRotation = 0;
    const resize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.fov = width < 700 ? 44 : 34;
      camera.updateProjectionMatrix();
      group.scale.setScalar(width < 700 ? 0.68 : Math.min(1, width / 1300));
      group.position.set(width < 700 ? 0 : 2.25, width < 700 ? -1.12 : -0.2, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();
    const onScroll = () => { scrollY = window.scrollY; };
    const onPointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      if (dragged) dragRotation += (event.clientX - dragStart) * 0.005, dragStart = event.clientX;
    };
    const onDown = (event: PointerEvent) => { dragged = true; dragStart = event.clientX; };
    const onUp = () => { dragged = false; };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer);
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const scrollProgress = Math.min(scrollY / Math.max(window.innerHeight, 1), 1);
      const targetY = -0.36 + dragRotation + (reduced ? 0 : pointerX * 0.13 + scrollProgress * 0.9);
      group.rotation.y += (targetY - group.rotation.y) * 0.055;
      group.rotation.x += ((reduced ? 0 : -pointerY * 0.065 + scrollProgress * 0.12) - group.rotation.x) * 0.055;
      group.rotation.z = reduced ? -0.08 : -0.08 + Math.sin(t * 0.47) * 0.018;
      group.position.y = (width < 700 ? -1.12 : -0.2) + (reduced ? 0 : Math.sin(t * 0.8) * 0.09) - scrollProgress * 0.3;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const mats = Array.isArray(object.material) ? object.material : [object.material];
          mats.forEach((mat) => { if (mat instanceof THREE.MeshBasicMaterial) mat.map?.dispose(); mat.dispose(); });
        }
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="book-scene" aria-hidden="true" />;
}
