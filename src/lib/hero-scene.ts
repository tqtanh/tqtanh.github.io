// Babylon.js scene behind the home hero: a neon grid floor receding into fog, with
// wireframe motifs for past projects. Loaded lazily from index.astro.
//
//   Mixed Reality System   → headset with eye-tracking gaze rays
//   Mixed Reality Presence → node-link literature graph
//   IPQ Cal                → bar chart of the four IPQ subscales
//   360° VR Streaming      → 360° video sphere with a camera at its centre
//   Moon & Mars Simulator  → Moon with Mars in orbit, plus a motion-captured avatar hopping in low gravity
//   Hybrid VR Bike         → bicycle riding the scrolling floor
//   Laser tag (Delta Strike) → tagger firing pulsed bolts, with signal arcs for live device management
import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Matrix, Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder';
import { CreateBox } from '@babylonjs/core/Meshes/Builders/boxBuilder';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { CreateIcoSphere } from '@babylonjs/core/Meshes/Builders/icoSphereBuilder';
import { CreateTorus } from '@babylonjs/core/Meshes/Builders/torusBuilder';
import { CreateCylinder } from '@babylonjs/core/Meshes/Builders/cylinderBuilder';
import { CreateLineSystem } from '@babylonjs/core/Meshes/Builders/linesBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { GridMaterial } from '@babylonjs/materials/grid/gridMaterial';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import type { LinesMesh } from '@babylonjs/core/Meshes/linesMesh';
import { projects, projectSlug } from '../data/cv';

type Palette = { bg: Color3; accent: Color3; dark: boolean };
type Update = (t: number, dt: number) => void;

function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const hex = (name: string, fallback: string) => {
    const v = css.getPropertyValue(name).trim();
    return Color3.FromHexString(/^#[0-9a-f]{6}$/i.test(v) ? v : fallback);
  };
  return {
    bg: hex('--ds-surface-canvas', '#eef0f4'),
    accent: hex('--ds-color-accent-fill', '#1e6ceb'),
    dark: document.documentElement.classList.contains('dark'),
  };
}

// Camera sits low and pitches up, so the horizon lands below the hero text and buttons.
const CAMERA_Y = 1.2;
const LOOK_AT = new Vector3(0, 8.7, 30);

const v = (x: number, y: number, z = 0) => new Vector3(x, y, z);

export function mountHeroScene(
  canvas: HTMLCanvasElement,
  opts: { animate: boolean; labels?: HTMLElement | null },
) {
  const engine = new Engine(canvas, true, { preserveDrawingBuffer: false, stencil: false, alpha: false });
  engine.setHardwareScalingLevel(1 / Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new Scene(engine);
  scene.skipPointerMovePicking = true;
  scene.fogMode = Scene.FOGMODE_EXP2;

  const camera = new FreeCamera('cam', new Vector3(0, CAMERA_Y, -12), scene);
  camera.fov = 0.8;
  camera.minZ = 0.1;
  camera.maxZ = 400;
  camera.setTarget(LOOK_AT);

  // Floor
  const ground = CreateGround('floor', { width: 400, height: 400 }, scene);
  ground.position.z = 150;
  const grid = new GridMaterial('grid', scene);
  grid.gridRatio = 2;
  grid.majorUnitFrequency = 5;
  grid.minorUnitVisibility = 0.35;
  grid.backFaceCulling = false;
  ground.material = grid;

  // Shared look for every motif: unlit wireframe in the accent colour, not fogged.
  const wire = new StandardMaterial('wire', scene);
  wire.wireframe = true;
  wire.disableLighting = true;
  const lines: LinesMesh[] = [];

  const node = (name: string, pos: Vector3, parent?: TransformNode) => {
    const n = new TransformNode(name, scene);
    n.position.copyFrom(pos);
    if (parent) n.parent = parent;
    return n;
  };
  const dress = <T extends Mesh>(mesh: T, parent: TransformNode) => {
    mesh.material = wire;
    mesh.parent = parent;
    mesh.applyFog = false;
    mesh.isPickable = false;
    return mesh;
  };
  const lineSet = (name: string, segs: Vector3[][], parent: TransformNode, updatable = false) => {
    const l = CreateLineSystem(name, { lines: segs, updatable }, scene);
    l.parent = parent;
    l.applyFog = false;
    l.isPickable = false;
    lines.push(l);
    return l;
  };

  const updates: Update[] = [];
  let hopHeight = 1.6; // avatar hop; lowered on phones so it stays under the buttons

  // Hover targets: an invisible link over each motif, linking to its card on /projects/.
  type Target = { root: TransformNode; center: Vector3; radius: number; el: HTMLAnchorElement; base: number; hover: boolean };
  const targets: Target[] = [];
  const addTarget = (root: TransformNode, title: string, center: Vector3, radius: number) => {
    if (!opts.labels) return;
    const el = document.createElement('a');
    el.className = 'hero-scene-target';
    el.href = `/projects/#${projectSlug(title)}`;
    el.tabIndex = -1;
    const caption = document.createElement('span');
    caption.className = 'hero-scene-caption';
    const year = document.createElement('small');
    year.textContent = projects.find((p) => p.title === title)?.period ?? '';
    caption.append(`${title} `, year);
    el.append(caption);
    const tg: Target = { root, center, radius, el, base: root.scaling.x, hover: false };
    el.addEventListener('pointerenter', () => setHover(tg, true));
    el.addEventListener('pointerleave', () => setHover(tg, false));
    opts.labels.append(el);
    targets.push(tg);
  };
  const setHover = (tg: Target, on: boolean) => {
    tg.hover = on;
    if (!opts.animate) {
      tg.root.scaling.setAll(tg.base * (on ? 1.15 : 1));
      renderStill();
    }
  };

  // Mixed Reality System: headset with eye-tracking gaze rays.
  {
    const root = node('mrSystem', v(12, 16.5, 20));
    addTarget(root, 'Mixed Reality System', v(0, 0, -1), 2.4);
    dress(CreateBox('visor', { width: 2.6, height: 1.3, depth: 1.2 }, scene), root);
    const strap = dress(CreateTorus('strap', { diameter: 2.8, thickness: 0.08, tessellation: 20 }, scene), root);
    strap.scaling.z = 1.4;
    strap.position.z = 1.4;
    for (const x of [-0.6, 0.6]) {
      const lens = dress(CreateCylinder('lens', { diameter: 0.7, height: 0.1, tessellation: 10 }, scene), root);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(x, 0, -0.65);
    }
    const target = node('gazeTarget', v(0, -0.5, -5), root);
    dress(CreateSphere('gazeMarker', { diameter: 0.35, segments: 4 }, scene), target);
    const rays = (g: Vector3) => [[v(-0.6, 0, -0.7), g], [v(0.6, 0, -0.7), g]];
    let gaze = lineSet('gaze', rays(v(0, -0.5, -5)), root, true);
    updates.push((t) => {
      root.rotation.y = Math.sin(t * 0.4) * 0.5 + 0.3;
      root.rotation.x = Math.sin(t * 0.3) * 0.1;
      // Gaze point wanders, rays follow it.
      const gx = Math.sin(t * 0.9) * 1.2;
      const gy = Math.cos(t * 0.7) * 0.6 - 0.5;
      target.position.set(gx, gy, -5);
      gaze = CreateLineSystem('gaze', { lines: rays(target.position), instance: gaze }, scene);
    });
  }

  // Mixed Reality Presence: a literature graph (D3-style node-link diagram).
  {
    const root = node('mrPresence', v(29, 22, 30));
    addTarget(root, 'Mixed Reality Presence', v(0, 0, 0), 3.2);
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
    const pts = Array.from({ length: 14 }, () => new Vector3(rand(), rand(), rand()).normalize().scale(3 * (0.6 + 0.4 * Math.abs(rand()))));
    pts.forEach((p, i) => {
      const s = dress(CreateSphere(`paper${i}`, { diameter: i % 4 === 0 ? 0.5 : 0.3, segments: 3 }, scene), root);
      s.position.copyFrom(p);
    });
    const edges: Vector3[][] = [];
    pts.forEach((p, i) => {
      pts
        .map((q, j) => ({ j, d: Vector3.Distance(p, q) }))
        .filter((e) => e.j > i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .forEach((e) => edges.push([p, pts[e.j]]));
    });
    lineSet('citations', edges, root);
    updates.push((t, dt) => {
      root.rotation.y += dt * 0.15;
      root.rotation.x = Math.sin(t * 0.25) * 0.3;
    });
  }

  // IPQ Cal: the four IPQ subscales as a bar chart (general, spatial, involvement, realism).
  {
    const root = node('ipqCal', v(-36, 26, 40));
    addTarget(root, 'IPQ Cal', v(0.3, 2, 0), 3.2);
    root.rotation.y = 0.5;
    const base = [3.2, 2.4, 2.8, 1.8];
    const bars = base.map((_, i) => {
      const b = dress(CreateBox(`bar${i}`, { width: 0.9, height: 1, depth: 0.9 }, scene), root);
      b.position.x = i * 1.3 - 2;
      return b;
    });
    lineSet('axes', [[v(-2.8, 4.2), v(-2.8, 0), v(3.4, 0)]], root);
    updates.push((t) => {
      bars.forEach((b, i) => {
        const h = base[i] + Math.sin(t * 0.8 + i * 1.3) * 0.5;
        b.scaling.y = h;
        b.position.y = h / 2;
      });
    });
  }

  // 360° VR Streaming: a 360° video sphere with the capture camera at its centre.
  {
    const root = node('vr360', v(47, 7, 50));
    addTarget(root, '360° VR Streaming', v(0, 0, 0), 3.6);
    dress(CreateSphere('videoSphere', { diameter: 7, segments: 6 }, scene), root);
    const cam = dress(CreateBox('camera360', { size: 0.7 }, scene), root);
    lineSet('streamRays', [[v(0, 0, 0), v(0, 0, -3.5)], [v(0, 0, 0), v(3.5, 0, 0)], [v(0, 0, 0), v(-3.5, 0, 0)], [v(0, 0, 0), v(0, 3.5, 0)]], root);
    updates.push((t, dt) => {
      root.rotation.y += dt * 0.2;
      cam.rotation.y = -root.rotation.y + Math.sin(t) * 0.3;
    });
  }

  // Moon & Mars VR Simulator: Moon with Mars in an inclined orbit.
  {
    const root = node('moonMars', v(-38, 15, 40));
    addTarget(root, 'Moon & Mars VR Simulator', v(0, 0, 0), 5);
    const moon = dress(CreateIcoSphere('moon', { radius: 2.4, subdivisions: 2 }, scene), root);
    const orbit = node('orbit', v(0, 0, 0), root);
    orbit.rotation.z = 0.35;
    const ring: Vector3[] = Array.from({ length: 49 }, (_, i) => {
      const a = (i / 48) * Math.PI * 2;
      return v(Math.cos(a) * 5, 0, Math.sin(a) * 5);
    });
    lineSet('orbitRing', [ring], orbit);
    const mars = dress(CreateIcoSphere('mars', { radius: 1, subdivisions: 1 }, scene), orbit);
    updates.push((t, dt) => {
      moon.rotation.y += dt * 0.1;
      mars.position.set(Math.cos(t * 0.35) * 5, 0, Math.sin(t * 0.35) * 5);
      mars.rotation.y += dt * 0.4;
    });
  }

  // Moon & Mars VR Simulator: OptiTrack-style avatar (skeleton + markers) hopping in low gravity.
  {
    const root = node('avatar', v(-9.6, 0, 2));
    root.scaling.setAll(0.8);
    addTarget(root, 'Moon & Mars VR Simulator', v(0, 1.8, 0), 1.3);
    root.rotation.y = 0.4;
    const body = node('avatarBody', v(0, 0, 0), root);
    const head = dress(CreateSphere('head', { diameter: 0.6, segments: 4 }, scene), body);
    head.position.y = 2.65;
    const joints = {
      neck: v(0, 2.3), pelvis: v(0, 1.3),
      lSh: v(-0.45, 2.2), rSh: v(0.45, 2.2),
      lHand: v(-0.8, 1.5), rHand: v(0.8, 1.5),
      lKnee: v(-0.25, 0.7), rKnee: v(0.25, 0.7),
      lFoot: v(-0.3, 0), rFoot: v(0.3, 0),
    };
    const skeleton = (j: typeof joints) => [
      [j.neck, j.pelvis], [j.lSh, j.rSh],
      [j.lSh, j.lHand], [j.rSh, j.rHand],
      [j.pelvis, j.lKnee, j.lFoot], [j.pelvis, j.rKnee, j.rFoot],
    ];
    let rig = lineSet('bones', skeleton(joints), body, true);
    const markers = Object.values(joints).map((p, i) => {
      const m = dress(CreateSphere(`marker${i}`, { diameter: 0.18, segments: 3 }, scene), body);
      m.position.copyFrom(p);
      return m;
    });
    updates.push((t) => {
      const phase = (t * 0.45) % 1; // one slow hop every ~2.2 s
      const hop = Math.sin(phase * Math.PI);
      body.position.y = hop * hopHeight;
      const swing = 0.35 + hop * 0.5; // arms lift mid-air
      const tuck = (1 - hop) * 0.25; // knees bend on landing
      const j = {
        ...joints,
        lHand: v(-0.8 - swing * 0.3, 1.5 + swing),
        rHand: v(0.8 + swing * 0.3, 1.5 + swing),
        lKnee: v(-0.25, 0.7, -tuck),
        rKnee: v(0.25, 0.7, -tuck),
      };
      rig = CreateLineSystem('bones', { lines: skeleton(j), instance: rig }, scene);
      Object.values(j).forEach((p, i) => markers[i].position.copyFrom(p));
    });
  }

  // Hybrid VR Bike Simulator: a bicycle (with assist battery) riding the scrolling floor.
  {
    const root = node('bike', v(7.5, 0, 2));
    root.scaling.setAll(0.8);
    addTarget(root, 'Hybrid VR Bike Simulator', v(0, 1.6, 0), 1.6);
    root.rotation.y = -0.55;
    const wheels = [-1.6, 1.6].map((x, i) => {
      const hub = node(`hub${i}`, v(x, 1, 0), root);
      const tyre = dress(CreateTorus(`tyre${i}`, { diameter: 2, thickness: 0.07, tessellation: 24 }, scene), hub);
      tyre.rotation.x = Math.PI / 2;
      const spokes: Vector3[][] = Array.from({ length: 4 }, (_, k) => {
        const a = (k / 4) * Math.PI;
        return [v(Math.cos(a) * 0.95, Math.sin(a) * 0.95), v(-Math.cos(a) * 0.95, -Math.sin(a) * 0.95)];
      });
      lineSet(`spokes${i}`, spokes, hub);
      return hub;
    });
    const rear = v(-1.6, 1), bb = v(0, 1), seat = v(-0.5, 2.4), head = v(1.2, 2.5), front = v(1.6, 1);
    lineSet('frame', [
      [rear, seat, bb, rear],
      [seat, head, bb],
      [head, front],
      [seat, v(-0.65, 2.85)], [v(-1.05, 2.85), v(-0.3, 2.85)], // seat post + saddle
      [head, v(1.05, 3.1)], [v(1.05, 3.1, -0.5), v(1.05, 3.1, 0.5)], // stem + handlebar
    ], root);
    const battery = dress(CreateBox('battery', { width: 0.8, height: 0.3, depth: 0.25 }, scene), root);
    battery.position.set(0.55, 1.7, 0);
    battery.rotation.z = Math.atan2(head.y - bb.y, head.x - bb.x);
    updates.push((t, dt) => {
      for (const w of wheels) w.rotation.z -= dt * 2.4;
      root.position.y = Math.abs(Math.sin(t * 6)) * 0.03; // road buzz
    });
  }

  // Delta Strike: laser tagger firing pulsed bolts, signal arcs for real-time device management.
  {
    const root = node('laserTag', v(2.2, 0.5, -4));
    root.rotation.y = -0.4;
    root.scaling.setAll(0.8);
    addTarget(root, 'Laser Tag Device & Game Management', v(0.3, 0, 0), 1.4);
    dress(CreateBox('taggerBody', { width: 1.6, height: 0.5, depth: 0.5 }, scene), root);
    const barrel = dress(CreateCylinder('taggerBarrel', { diameter: 0.25, height: 1, tessellation: 8 }, scene), root);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(1.3, 0.05, 0);
    const grip = dress(CreateBox('taggerGrip', { width: 0.35, height: 0.7, depth: 0.3 }, scene), root);
    grip.position.set(-0.35, -0.5, 0);
    grip.rotation.z = -0.3;
    const sensor = dress(CreateSphere('taggerSensor', { diameter: 0.35, segments: 4 }, scene), root);
    sensor.position.set(-0.2, 0.35, 0);

    const muzzle = 1.8;
    const boltLen = 1.4;
    const bolt = (d: number) => [[v(muzzle + d, 0.05), v(muzzle + d + boltLen, 0.05)]];
    let beam = lineSet('bolt', bolt(0), root, true);

    const arcs = [0.35, 0.6, 0.85].map((r, i) =>
      lineSet(`signal${i}`, [Array.from({ length: 9 }, (_, k) => {
        const a = Math.PI / 4 + (k / 8) * (Math.PI / 2);
        return v(-0.2 + Math.cos(a) * r, 0.5 + Math.sin(a) * r);
      })], root),
    );
    updates.push((t) => {
      const shot = (t % 1.4) / 1.4; // one shot every 1.4 s
      beam = CreateLineSystem('bolt', { lines: bolt(shot * 14), instance: beam }, scene);
      beam.isVisible = shot < 0.85;
      const pulse = Math.floor((t * 2.5) % 4); // arcs light up one by one
      arcs.forEach((a, i) => (a.isVisible = i < pulse));
      root.position.y = 0.5 + Math.sin(t * 1.1) * 0.05;
    });
  }

  const applyPalette = () => {
    const p = readPalette();
    scene.clearColor = new Color4(p.bg.r, p.bg.g, p.bg.b, 1);
    scene.fogColor = p.bg;
    scene.fogDensity = p.dark ? 0.022 : 0.026;
    grid.mainColor = p.bg;
    grid.lineColor = Color3.Lerp(p.bg, p.accent, p.dark ? 0.85 : 0.6);
    const ink = Color3.Lerp(p.bg, p.accent, p.dark ? 0.75 : 0.6);
    wire.emissiveColor = ink;
    for (const l of lines) l.color = ink;
  };
  applyPalette();
  const themeObserver = new MutationObserver(() => {
    applyPalette();
    if (!opts.animate) renderStill();
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  // Gentle parallax: the camera leans toward the pointer.
  const pointer = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  let t = 0;
  const tick = () => {
    const dt = Math.min(engine.getDeltaTime() / 1000, 0.1);
    t += dt;
    grid.gridOffset.z -= dt * 1.6; // floor scrolls toward the viewer
    for (const u of updates) u(t, dt);
    for (const tg of targets) {
      const goal = tg.base * (tg.hover ? 1.15 : 1);
      tg.root.scaling.setAll(tg.root.scaling.x + (goal - tg.root.scaling.x) * 0.15);
    }
    camera.position.x += (pointer.x * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (CAMERA_Y - pointer.y * 0.4 - camera.position.y) * 0.04;
    camera.setTarget(LOOK_AT);
  };
  // Pose a pleasant still frame for reduced motion.
  for (const u of updates) u(1.2, 0);

  // Phones (< 640px wide) show only the floor, the bike and the avatar, moved closer together.
  const WIDE_ONLY = ['mrSystem', 'mrPresence', 'ipqCal', 'vr360', 'moonMars', 'laserTag'];
  const PLACEMENT: Record<string, { wide: [Vector3, number]; compact: [Vector3, number] }> = {
    avatar: { wide: [v(-9.6, 0, 2), 0.8], compact: [v(0.05, 0, -6.5), 0.2] },
    bike: { wide: [v(7.5, 0, 2), 0.8], compact: [v(1.15, 0, -6), 0.26] },
  };
  let compact: boolean | null = null;
  const applyLayout = () => {
    const c = canvas.clientWidth < 640;
    if (c === compact) return;
    compact = c;
    hopHeight = c ? 0.5 : 1.6;
    for (const name of WIDE_ONLY) scene.getTransformNodeByName(name)?.setEnabled(!c);
    for (const [name, place] of Object.entries(PLACEMENT)) {
      const n = scene.getTransformNodeByName(name);
      if (!n) continue;
      const [pos, scale] = c ? place.compact : place.wide;
      n.position.x = pos.x;
      n.position.z = pos.z;
      n.scaling.setAll(scale);
      const tg = targets.find((x) => x.root === n);
      if (tg) tg.base = scale;
    }
  };
  applyLayout();

  // Place each hover target over its motif (CSS px, same box as the canvas).
  const layout = () => {
    if (!targets.length) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const viewport = camera.viewport.toGlobal(w, h);
    const transform = scene.getTransformMatrix();
    const right = camera.getDirection(Vector3.Right());
    for (const tg of targets) {
      if (!tg.root.isEnabled()) {
        tg.el.hidden = true;
        continue;
      }
      const world = Vector3.TransformCoordinates(tg.center, tg.root.getWorldMatrix());
      const c = Vector3.Project(world, Matrix.IdentityReadOnly, transform, viewport);
      const e = Vector3.Project(world.add(right.scale(tg.radius)), Matrix.IdentityReadOnly, transform, viewport);
      const r = Math.max(20, Math.hypot(e.x - c.x, e.y - c.y));
      const visible = c.z > 0 && c.z < 1 && c.x > -r && c.x < w + r && c.y > -r && c.y < h + r;
      tg.el.hidden = !visible;
      if (!visible) continue;
      tg.el.style.width = tg.el.style.height = `${2 * r}px`;
      tg.el.style.transform = `translate(${c.x - r}px, ${c.y - r}px)`;
    }
  };
  const renderStill = () => {
    scene.render();
    layout();
  };

  let running = false;
  const start = () => {
    if (running || !opts.animate) return;
    running = true;
    engine.runRenderLoop(() => {
      tick();
      scene.render();
      layout();
    });
  };
  const stop = () => {
    running = false;
    engine.stopRenderLoop();
  };

  // Only render while the hero is on screen.
  const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
  visibility.observe(canvas);
  const resize = new ResizeObserver(() => {
    applyLayout();
    engine.resize();
    if (!opts.animate) renderStill();
    else layout();
  });
  resize.observe(canvas);

  if (opts.animate) window.addEventListener('pointermove', onPointer, { passive: true });

  return new Promise<() => void>((resolve) => {
    scene.executeWhenReady(() => {
      renderStill();
      resolve(() => {
        stop();
        visibility.disconnect();
        resize.disconnect();
        themeObserver.disconnect();
        window.removeEventListener('pointermove', onPointer);
        for (const tg of targets) tg.el.remove();
        engine.dispose();
      });
    });
  });
}
