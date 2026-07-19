import { RoundedBox } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";

/* ----------------------------- Data model ----------------------------- */

export type ItemType =
  | "sofa"
  | "armchair"
  | "coffeeTable"
  | "diningSet"
  | "bed"
  | "wardrobe"
  | "kitchen"
  | "tv"
  | "plant"
  | "rug"
  | "lamp"
  | "tree"
  | "shrub"
  | "flowerbed"
  | "pond"
  | "bench"
  | "pergola"
  | "planter"
  | "path"
  | "fence";

export type ItemCategory = "interior" | "outdoor";

export type PlacedItem = {
  uid: string;
  type: ItemType;
  x: number;
  z: number;
  rot: number;
};

export type ItemDef = {
  type: ItemType;
  name: string;
  icon: string;
  category: ItemCategory;
  w: number;
  d: number;
};

export const CATALOG: ItemDef[] = [
  { type: "sofa", name: "Диван", icon: "🛋️", category: "interior", w: 2.4, d: 1.0 },
  { type: "armchair", name: "Крісло", icon: "🪑", category: "interior", w: 1.0, d: 1.0 },
  { type: "coffeeTable", name: "Журн. стіл", icon: "🪞", category: "interior", w: 1.3, d: 0.7 },
  { type: "diningSet", name: "Обідній стіл", icon: "🍽️", category: "interior", w: 1.8, d: 1.1 },
  { type: "bed", name: "Ліжко", icon: "🛏️", category: "interior", w: 2.1, d: 2.3 },
  { type: "wardrobe", name: "Шафа", icon: "🚪", category: "interior", w: 1.4, d: 0.6 },
  { type: "kitchen", name: "Кухня", icon: "🍳", category: "interior", w: 2.6, d: 0.7 },
  { type: "tv", name: "ТБ-зона", icon: "📺", category: "interior", w: 1.7, d: 0.4 },
  { type: "plant", name: "Рослина", icon: "🪴", category: "interior", w: 0.8, d: 0.8 },
  { type: "rug", name: "Килим", icon: "🟫", category: "interior", w: 2.6, d: 1.8 },
  { type: "lamp", name: "Торшер", icon: "💡", category: "interior", w: 0.5, d: 0.5 },

  { type: "tree", name: "Дерево", icon: "🌳", category: "outdoor", w: 1.6, d: 1.6 },
  { type: "shrub", name: "Кущ", icon: "🌿", category: "outdoor", w: 1.0, d: 1.0 },
  { type: "flowerbed", name: "Клумба", icon: "🌸", category: "outdoor", w: 1.4, d: 0.8 },
  { type: "pond", name: "Водойма", icon: "💧", category: "outdoor", w: 2.2, d: 2.2 },
  { type: "bench", name: "Лавка", icon: "🛋️", category: "outdoor", w: 1.8, d: 0.7 },
  { type: "pergola", name: "Пергола", icon: "🏛️", category: "outdoor", w: 2.4, d: 2.4 },
  { type: "planter", name: "Вазон", icon: "🪴", category: "outdoor", w: 1.2, d: 1.2 },
  { type: "path", name: "Доріжка", icon: "🧱", category: "outdoor", w: 2.4, d: 1.0 },
  { type: "fence", name: "Паркан", icon: "🚧", category: "outdoor", w: 2.4, d: 0.3 },
];

export const defOf = (t: ItemType) => CATALOG.find((d) => d.type === t)!;

/* ----------------------------- Materials ----------------------------- */

const M = {
  concrete: "#bdb8ad",
  concreteDark: "#8d877a",
  wood: "#9d7a4b",
  woodLight: "#c1985e",
  fabric: "#dad4c8",
  fabricDark: "#c2bcb0",
  clay: "#c0603a",
  olive: "#6f8550",
  oliveDark: "#566a3f",
  metal: "#3b3935",
  white: "#efece5",
  water: "#5b9fc4",
  plant: "#5f8a48",
  plantDark: "#4c7338",
};

function mat(color: string, rough = 0.9, metal = 0) {
  return (
    <meshStandardMaterial color={color} roughness={rough} metalness={metal} />
  );
}

/* ----------------------------- Selection ----------------------------- */

function SelectionRing({ w, d }: { w: number; d: number }) {
  const t = 0.06;
  return (
    <group position={[0, 0.04, 0]}>
      <mesh position={[0, 0, d / 2]}>
        <boxGeometry args={[w + t * 2, 0.02, t]} />
        <meshStandardMaterial color={M.clay} emissive={M.clay} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 0, -d / 2]}>
        <boxGeometry args={[w + t * 2, 0.02, t]} />
        <meshStandardMaterial color={M.clay} emissive={M.clay} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[w / 2, 0, 0]}>
        <boxGeometry args={[t, 0.02, d]} />
        <meshStandardMaterial color={M.clay} emissive={M.clay} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-w / 2, 0, 0]}>
        <boxGeometry args={[t, 0.02, d]} />
        <meshStandardMaterial color={M.clay} emissive={M.clay} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

/* ----------------------------- Leg helper ----------------------------- */

function Leg({ x, z, h = 0.2 }: { x: number; z: number; h?: number }) {
  return (
    <mesh position={[x, h / 2, z]} castShadow>
      <cylinderGeometry args={[0.04, 0.04, h, 8]} />
      {mat(M.metal)}
    </mesh>
  );
}

/* ----------------------------- Models ----------------------------- */

function Sofa() {
  return (
    <group>
      <RoundedBox args={[2.4, 0.4, 1.0]} radius={0.08} position={[0, 0.35, 0]} castShadow>
        {mat(M.fabricDark)}
      </RoundedBox>
      <RoundedBox args={[2.4, 0.7, 0.22]} radius={0.08} position={[0, 0.78, -0.4]} castShadow>
        {mat(M.fabric)}
      </RoundedBox>
      <RoundedBox args={[0.22, 0.5, 1.0]} radius={0.08} position={[1.18, 0.5, 0]} castShadow>
        {mat(M.fabric)}
      </RoundedBox>
      <RoundedBox args={[0.22, 0.5, 1.0]} radius={0.08} position={[-1.18, 0.5, 0]} castShadow>
        {mat(M.fabric)}
      </RoundedBox>
      <RoundedBox args={[1.0, 0.18, 0.85]} radius={0.07} position={[0.6, 0.6, 0.02]} castShadow>
        {mat(M.white)}
      </RoundedBox>
      <RoundedBox args={[1.0, 0.18, 0.85]} radius={0.07} position={[-0.6, 0.6, 0.02]} castShadow>
        {mat(M.white)}
      </RoundedBox>
      <Leg x={-1.05} z={0.4} />
      <Leg x={1.05} z={0.4} />
      <Leg x={-1.05} z={-0.4} />
      <Leg x={1.05} z={-0.4} />
    </group>
  );
}

function Armchair() {
  return (
    <group>
      <RoundedBox args={[0.95, 0.4, 0.95]} radius={0.08} position={[0, 0.32, 0]} castShadow>
        {mat(M.clay)}
      </RoundedBox>
      <RoundedBox args={[0.95, 0.62, 0.2]} radius={0.08} position={[0, 0.72, -0.38]} castShadow>
        {mat(M.clay)}
      </RoundedBox>
      <RoundedBox args={[0.2, 0.46, 0.95]} radius={0.07} position={[0.47, 0.5, 0]} castShadow>
        {mat(M.clay)}
      </RoundedBox>
      <RoundedBox args={[0.2, 0.46, 0.95]} radius={0.07} position={[-0.47, 0.5, 0]} castShadow>
        {mat(M.clay)}
      </RoundedBox>
      <Leg x={-0.4} z={0.4} h={0.18} />
      <Leg x={0.4} z={0.4} h={0.18} />
      <Leg x={-0.4} z={-0.4} h={0.18} />
      <Leg x={0.4} z={-0.4} h={0.18} />
    </group>
  );
}

function CoffeeTable() {
  return (
    <group>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.3, 0.08, 0.7]} />
        {mat(M.wood)}
      </mesh>
      <Leg x={-0.58} z={0.3} h={0.38} />
      <Leg x={0.58} z={0.3} h={0.38} />
      <Leg x={-0.58} z={-0.3} h={0.38} />
      <Leg x={0.58} z={-0.3} h={0.38} />
    </group>
  );
}

function Chair({ x, z, rot = 0 }: { x: number; z: number; rot?: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rot, 0]}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.42, 0.06, 0.42]} />
        {mat(M.woodLight)}
      </mesh>
      <mesh position={[0, 0.72, -0.18]} castShadow>
        <boxGeometry args={[0.42, 0.5, 0.05]} />
        {mat(M.woodLight)}
      </mesh>
      <mesh position={[-0.17, 0.22, -0.17]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        {mat(M.metal)}
      </mesh>
      <mesh position={[0.17, 0.22, -0.17]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        {mat(M.metal)}
      </mesh>
      <mesh position={[-0.17, 0.22, 0.17]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        {mat(M.metal)}
      </mesh>
      <mesh position={[0.17, 0.22, 0.17]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        {mat(M.metal)}
      </mesh>
    </group>
  );
}

function DiningSet() {
  return (
    <group>
      <mesh position={[0, 0.74, 0]} castShadow>
        <boxGeometry args={[1.7, 0.08, 0.95]} />
        {mat(M.wood)}
      </mesh>
      <Leg x={-0.75} z={0.4} h={0.72} />
      <Leg x={0.75} z={0.4} h={0.72} />
      <Leg x={-0.75} z={-0.4} h={0.72} />
      <Leg x={0.75} z={-0.4} h={0.72} />
      <Chair x={0} z={0.95} rot={Math.PI} />
      <Chair x={0} z={-0.95} rot={0} />
      <Chair x={0.95} z={0} rot={-Math.PI / 2} />
      <Chair x={-0.95} z={0} rot={Math.PI / 2} />
    </group>
  );
}

function Bed() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[2.1, 0.3, 2.3]} />
        {mat(M.wood)}
      </mesh>
      <RoundedBox args={[1.95, 0.22, 2.1]} radius={0.06} position={[0, 0.44, 0.05]} castShadow>
        {mat(M.white)}
      </RoundedBox>
      <mesh position={[0, 0.8, -1.1]} castShadow>
        <boxGeometry args={[2.1, 1.0, 0.12]} />
        {mat(M.wood)}
      </mesh>
      <RoundedBox args={[0.8, 0.16, 0.5]} radius={0.08} position={[-0.5, 0.56, -0.75]} castShadow>
        {mat(M.fabric)}
      </RoundedBox>
      <RoundedBox args={[0.8, 0.16, 0.5]} radius={0.08} position={[0.5, 0.56, -0.75]} castShadow>
        {mat(M.fabric)}
      </RoundedBox>
    </group>
  );
}

function Wardrobe() {
  return (
    <group>
      <mesh position={[0, 1.05, 0]} castShadow>
        <boxGeometry args={[1.4, 2.1, 0.6]} />
        {mat(M.woodLight)}
      </mesh>
      <mesh position={[0, 1.05, 0.31]}>
        <boxGeometry args={[0.02, 2.0, 0.02]} />
        {mat(M.metal)}
      </mesh>
      <mesh position={[0.34, 1.1, 0.33]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        {mat(M.metal)}
      </mesh>
      <mesh position={[-0.34, 1.0, 0.33]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        {mat(M.metal)}
      </mesh>
    </group>
  );
}

function Kitchen() {
  return (
    <group>
      <mesh position={[0, 0.45, 0.1]} castShadow>
        <boxGeometry args={[2.6, 0.9, 0.65]} />
        {mat(M.white)}
      </mesh>
      <mesh position={[0, 0.92, 0.43]}>
        <boxGeometry args={[2.6, 0.06, 0.6]} />
        {mat(M.concrete)}
      </mesh>
      <mesh position={[-0.8, 0.45, 0.43]}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
        {mat(M.metal)}
      </mesh>
      <mesh position={[0, 1.4, 0.1]}>
        <boxGeometry args={[2.6, 0.6, 0.35]} />
        {mat(M.woodLight)}
      </mesh>
    </group>
  );
}

function Tv() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.6, 0.35, 0.4]} />
        {mat(M.wood)}
      </mesh>
      <mesh position={[0, 0.95, -0.05]} castShadow>
        <boxGeometry args={[1.45, 0.82, 0.06]} />
        {mat(M.metal)}
      </mesh>
      <mesh position={[0, 0.95, -0.01]}>
        <boxGeometry args={[1.35, 0.74, 0.01]} />
        <meshStandardMaterial color="#1a1c1f" roughness={0.3} />
      </mesh>
    </group>
  );
}

function IndoorPlant() {
  return (
    <group>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.22, 0.6, 16]} />
        {mat(M.concrete)}
      </mesh>
      <mesh position={[0, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.42, 14, 14]} />
        {mat(M.plant, 0.95)}
      </mesh>
      <mesh position={[0.25, 1.15, 0.1]} castShadow>
        <sphereGeometry args={[0.26, 12, 12]} />
        {mat(M.plantDark, 0.95)}
      </mesh>
      <mesh position={[-0.22, 1.1, -0.12]} castShadow>
        <sphereGeometry args={[0.24, 12, 12]} />
        {mat(M.plantDark, 0.95)}
      </mesh>
    </group>
  );
}

function Rug() {
  return (
    <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[2.6, 1.8]} />
      <meshStandardMaterial color={M.clay} roughness={1} />
    </mesh>
  );
}

function Lamp() {
  return (
    <group>
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.24, 0.1, 16]} />
        {mat(M.metal)}
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.7, 8]} />
        {mat(M.metal)}
      </mesh>
      <mesh position={[0, 1.75, 0]} castShadow>
        <coneGeometry args={[0.32, 0.4, 18, 1, true]} />
        {mat(M.fabric)}
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#ffe7b0" emissive="#ffcf7a" emissiveIntensity={1.2} />
      </mesh>
      <pointLight position={[0, 1.6, 0]} intensity={6} distance={5} color="#ffcf8a" />
    </group>
  );
}

function Tree() {
  return (
    <group>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.24, 1.8, 12]} />
        {mat(M.wood)}
      </mesh>
      <mesh position={[0, 2.2, 0]} castShadow>
        <sphereGeometry args={[0.95, 16, 16]} />
        {mat(M.plant, 0.95)}
      </mesh>
      <mesh position={[0.6, 2.7, 0.2]} castShadow>
        <sphereGeometry args={[0.6, 14, 14]} />
        {mat(M.plantDark, 0.95)}
      </mesh>
      <mesh position={[-0.55, 2.5, -0.3]} castShadow>
        <sphereGeometry args={[0.55, 14, 14]} />
        {mat(M.plantDark, 0.95)}
      </mesh>
    </group>
  );
}

function Shrub() {
  return (
    <group>
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.5, 14, 14]} />
        {mat(M.olive, 0.95)}
      </mesh>
      <mesh position={[0.35, 0.28, 0.15]} castShadow>
        <sphereGeometry args={[0.38, 12, 12]} />
        {mat(M.oliveDark, 0.95)}
      </mesh>
      <mesh position={[-0.3, 0.3, -0.18]} castShadow>
        <sphereGeometry args={[0.34, 12, 12]} />
        {mat(M.oliveDark, 0.95)}
      </mesh>
    </group>
  );
}

function Flowerbed() {
  const flowers = [-0.5, -0.18, 0.14, 0.46];
  const colors = [M.clay, "#e0a44a", "#cf5b7a", M.clay];
  return (
    <group>
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.24, 0.8]} />
        {mat(M.concreteDark)}
      </mesh>
      <mesh position={[0, 0.26, 0]}>
        <boxGeometry args={[1.25, 0.06, 0.65]} />
        <meshStandardMaterial color="#5b4a32" roughness={1} />
      </mesh>
      {flowers.map((x, i) => (
        <group key={i} position={[x, 0.3, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color={colors[i]} roughness={0.85} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Pond() {
  return (
    <group>
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.1, 40]} />
        <meshStandardMaterial color={M.concreteDark} roughness={1} />
      </mesh>
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.95, 40]} />
        <meshStandardMaterial color={M.water} roughness={0.2} metalness={0.1} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function Bench() {
  return (
    <group>
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[1.8, 0.08, 0.45]} />
        {mat(M.wood)}
      </mesh>
      <mesh position={[0, 0.72, -0.18]} castShadow>
        <boxGeometry args={[1.8, 0.5, 0.06]} />
        {mat(M.woodLight)}
      </mesh>
      <mesh position={[-0.7, 0.22, 0]}>
        <boxGeometry args={[0.08, 0.45, 0.4]} />
        {mat(M.concrete)}
      </mesh>
      <mesh position={[0.7, 0.22, 0]}>
        <boxGeometry args={[0.08, 0.45, 0.4]} />
        {mat(M.concrete)}
      </mesh>
    </group>
  );
}

function Pergola() {
  const posts = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];
  return (
    <group>
      {posts.map(([x, z], i) => (
        <mesh key={i} position={[x, 1.2, z]} castShadow>
          <boxGeometry args={[0.12, 2.4, 0.12]} />
          {mat(M.wood)}
        </mesh>
      ))}
      {[-0.6, 0, 0.6].map((z, i) => (
        <mesh key={`b${i}`} position={[0, 2.45, z]} castShadow>
          <boxGeometry args={[2.3, 0.1, 0.1]} />
          {mat(M.woodLight)}
        </mesh>
      ))}
      {[1, 0.33, -0.33, -1].map((x, i) => (
        <mesh key={`s${i}`} position={[x, 2.35, 0]}>
          <boxGeometry args={[0.05, 0.05, 2.2]} />
          {mat(M.wood)}
        </mesh>
      ))}
    </group>
  );
}

function Planter() {
  return (
    <group>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.0, 0.6, 1.0]} />
        {mat(M.concrete)}
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[0.86, 0.06, 0.86]} />
        <meshStandardMaterial color="#5b4a32" roughness={1} />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow>
        <sphereGeometry args={[0.5, 14, 14]} />
        {mat(M.plant, 0.95)}
      </mesh>
    </group>
  );
}

function Path() {
  const tiles = [-0.9, -0.3, 0.3, 0.9];
  return (
    <group>
      {tiles.map((z, i) => (
        <mesh key={i} position={[0, 0.03, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[1.0, 0.5]} />
          <meshStandardMaterial color={i % 2 ? M.concrete : M.concreteDark} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function Fence() {
  const posts = [-1, -0.5, 0, 0.5, 1];
  return (
    <group>
      {posts.map((x, i) => (
        <mesh key={i} position={[x, 0.55, 0]} castShadow>
          <boxGeometry args={[0.08, 1.1, 0.08]} />
          {mat(M.woodLight)}
        </mesh>
      ))}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.2, 0.08, 0.04]} />
        {mat(M.wood)}
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[2.2, 0.08, 0.04]} />
        {mat(M.wood)}
      </mesh>
    </group>
  );
}

const MODELS: Record<ItemType, () => React.JSX.Element> = {
  sofa: Sofa,
  armchair: Armchair,
  coffeeTable: CoffeeTable,
  diningSet: DiningSet,
  bed: Bed,
  wardrobe: Wardrobe,
  kitchen: Kitchen,
  tv: Tv,
  plant: IndoorPlant,
  rug: Rug,
  lamp: Lamp,
  tree: Tree,
  shrub: Shrub,
  flowerbed: Flowerbed,
  pond: Pond,
  bench: Bench,
  pergola: Pergola,
  planter: Planter,
  path: Path,
  fence: Fence,
};

/* ----------------------------- Public ----------------------------- */

export function ItemMesh({
  item,
  selected,
  onSelect,
}: {
  item: PlacedItem;
  selected: boolean;
  onSelect: () => void;
}) {
  const def = defOf(item.type);
  const Model = MODELS[item.type];
  return (
    <group
      position={[item.x, 0, item.z]}
      rotation={[0, item.rot, 0]}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {selected && <SelectionRing w={def.w} d={def.d} />}
      <Model />
    </group>
  );
}


