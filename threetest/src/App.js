import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, extend } from 'react-three-fiber'
import { Html } from '@react-three/drei'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import model from "./models/nave.glb"
import Stars from './3d/Stars';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });


function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function StarShip (props) {
  const group = useRef()
  const { nodes, materials } = useLoader(GLTFLoader, model)
  console.log(materials)
  return (
    <group
    scale={[3.5, 3.5, 3.5]}
    ref={group} {...props} dispose={null}>
      <mesh material={nodes.Cube.material} geometry={nodes.Cube.geometry} />
      <mesh material={nodes.Cube001.material} geometry={nodes.Cube001.geometry} />
      <mesh material={nodes.Cube002.material} geometry={nodes.Cube002.geometry} />
      <mesh material={nodes.Cube003.material} geometry={nodes.Cube003.geometry} />
      <mesh material={nodes.Cube004.material} geometry={nodes.Cube004.geometry} />
    </group>
  )
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(state => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};


export default function App() {
  return (
    <Canvas>
      <CameraControls />

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Suspense fallback={<Loading></Loading>}>
        <StarShip position={[0, 0, -100]} />
        <Stars></Stars>

      </Suspense>

      
    </Canvas>
  )
}
