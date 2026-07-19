import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import {
  ItemMesh,
  type PlacedItem,
  type ItemType,
} from "./furniture";

export type Mode = "interior" | "house" | "landscape";
export type View = "orbit" | "top";

const FLOOR: Record<string, string> = {
  wood: "#b58a55",
  concrete: "#c8c3ba",
  tile: "#d6d2c8",
  dark: "#4f4b44",
  grass: "#7c8a52",
  stone: "#9a948a",
  gravel: "#847e74",
  sand: "#cbb98c",
};

const WALL: Record<string, string> = {
  concrete: "#c4bfb4",
  plaster: "#ece8e0",
  clay: "#b65a37",
  dark: "#47433c",
  brick: "#9c5a43",
};

const MODE_SIZE: Record<Mode, number> = {
  interior: 8,
  house: 8,
  landscape: 13,
};

const MODE_HEIGHT: Record<Mode, number> = {
  interior: 3,
  house: 3.4,
  landscape: 0,
};

const TOP_POS = new THREE.Vector3(0.01, 14, 0.01);
const ORBIT_POS = new THREE.Vector3(8.5, 6.8, 8.5);
const ORBIT_TARGET = new THREE.Vector3(0, 0.7, 0);

function CameraRig({
  view,
  autoRotate,
}: {
  view: View;
  autoRotate: boolean;
}) {
  const controls = useRef<any>(null);
  const animating = useRef(false);
  const { camera } = useThree();

  useEffect(() => {
    animating.current = true;
  }, [view]);

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c) return;
    if (animating.current) {
      const dest = view === "top" ? TOP_POS : ORBIT_POS;
      const tgt = view === "top" ? new THREE.Vector3(0, 0, 0) : ORBIT_TARGET;
      const k = 1 - Math.pow(0.0001, dt);
      camera.position.lerp(dest, k);
      c.target.lerp(tgt, k);
      c.update();
      if (camera.position.distanceTo(dest) < 0.08) animating.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      autoRotate={autoRotate && view !== "top"}
      autoRotateSpeed={0.55}
      rotateSpeed={0.8}
      zoomSpeed={0.9}
      minDistance={4}
      maxDistance={20}
      maxPolarAngle={view === "top" ? 0.04 : Math.PI / 2.05}
      target={ORBIT_TARGET}
    />
  );
}

function Shell({
  mode,
  size,
  height,
  floorMat,
  wallMat,
  showWalls,
  showRoof,
}: {
  mode: Mode;
  size: number;
  height: number;
  floorMat: string;
  wallMat: string;
  showWalls: boolean;
  showRoof: boolean;
}) {
  const floorColor = FLOOR[floorMat] ?? FLOOR.concrete;
  const wallColor = WALL[wallMat] ?? WALL.concrete;
  const h = height;
  const outdoor = mode === "landscape";

  return (
    <group>
      {/* Ground / floor */}
      {outdoor ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[size + 14, size + 14]} />
          <meshStandardMaterial color={floorColor} roughness={1} />
        </mesh>
      ) : (
        <mesh position={[0, -0.15, 0]} receiveShadow>
          <boxGeometry args={[size, 0.3, size]} />
          <meshStandardMaterial color={floorColor} roughness={0.85} />
        </mesh>
      )}

      {/* Drafting grid for interior */}
      {mode === "interior" && (
        <gridHelper
          args={[size, size, "#918a7d", "#c0baad"]}
          position={[0, 0.012, 0]}
        />
      )}

      {/* Walls */}
      {showWalls && mode !== "landscape" && (
        <group>
          {/* back */}
          <mesh position={[0, h / 2, -size / 2]} receiveShadow castShadow>
            <boxGeometry args={[size, h, 0.2]} />
            <meshStandardMaterial color={wallColor} roughness={0.95} />
          </mesh>
          {/* left */}
          <mesh position={[-size / 2, h / 2, 0]} receiveShadow castShadow>
            <boxGeometry args={[0.2, h, size]} />
            <meshStandardMaterial color={wallColor} roughness={0.95} />
          </mesh>
          {/* right */}
          <mesh position={[size / 2, h / 2, 0]} receiveShadow castShadow>
            <boxGeometry args={[0.2, h, size]} />
            <meshStandardMaterial color={wallColor} roughness={0.95} />
          </mesh>

          {mode === "interior" ? null : (
            /* front wall with door for house */
            <>
              <mesh position={[0, h / 2, size / 2]} receiveShadow castShadow>
                <boxGeometry args={[size, h, 0.2]} />
                <meshStandardMaterial color={wallColor} roughness={0.95} />
              </mesh>
              {/* door */}
              <mesh position={[0, 1.05, size / 2 - 0.02]}>
                <boxGeometry args={[1.1, 2.1, 0.06]} />
                <meshStandardMaterial color="#3b3935" roughness={0.6} />
              </mesh>
              {/* windows on side walls */}
              {[1.6, -1.6].map((z, i) => (
                <mesh key={i} position={[-size / 2 + 0.02, 1.8, z]}>
                  <boxGeometry args={[0.06, 1.1, 1.3]} />
                  <meshStandardMaterial
                    color="#9fc3d6"
                    roughness={0.2}
                    metalness={0.1}
                  />
                </mesh>
              ))}
              {[1.6, -1.6].map((z, i) => (
                <mesh key={`r${i}`} position={[size / 2 - 0.02, 1.8, z]}>
                  <boxGeometry args={[0.06, 1.1, 1.3]} />
                  <meshStandardMaterial
                    color="#9fc3d6"
                    roughness={0.2}
                    metalness={0.1}
                  />
                </mesh>
              ))}
            </>
          )}
        </group>
      )}

      {/* Roof */}
      {showRoof && mode !== "landscape" && (
        <mesh position={[0, h + 0.16, 0]} castShadow>
          <boxGeometry args={[size + 0.5, 0.22, size + 0.5]} />
          <meshStandardMaterial color={wallColor} roughness={0.95} />
        </mesh>
      )}
    </group>
  );
}

export interface DesignerSceneProps {
  mode: Mode;
  floorMat: string;
  wallMat: string;
  showWalls: boolean;
  showRoof: boolean;
  items: PlacedItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  autoRotate: boolean;
  view: View;
}

function SceneContent(props: DesignerSceneProps) {
  const size = MODE_SIZE[props.mode];
  const height = MODE_HEIGHT[props.mode];

  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight
        color="#f3f0ea"
        groundColor="#7b7568"
        intensity={0.75}
      />
      <directionalLight position={[6, 9, 5]} intensity={1.35} color="#fff4e6" />
      <directionalLight position={[-7, 5, -4]} intensity={0.35} color="#cdd6e6" />

      <Shell
        mode={props.mode}
        size={size}
        height={height}
        floorMat={props.floorMat}
        wallMat={props.wallMat}
        showWalls={props.showWalls}
        showRoof={props.showRoof}
      />

      {props.items.map((it) => (
        <ItemMesh
          key={it.uid}
          item={it}
          selected={props.selectedId === it.uid}
          onSelect={() => props.onSelect(it.uid)}
        />
      ))}

      <ContactShadows
        position={[0, 0.015, 0]}
        opacity={0.45}
        scale={size + 4}
        blur={2.4}
        far={6}
        resolution={1024}
        color="#1c1a17"
      />

      <CameraRig view={props.view} autoRotate={props.autoRotate} />
    </>
  );
}

export default function DesignerScene(props: DesignerSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [8.5, 6.8, 8.5], fov: 42, near: 0.1, far: 100 }}
      gl={{ alpha: true, antialias: true }}
      onPointerMissed={() => props.onSelect(null)}
      className="!touch-none"
    >
      <SceneContent {...props} />
    </Canvas>
  );
}

/* Re-export for convenience */
export type { ItemType };
