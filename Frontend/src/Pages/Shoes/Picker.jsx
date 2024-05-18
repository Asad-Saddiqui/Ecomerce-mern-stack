import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls
} from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import {  useSnapshot } from "valtio";
import { proxy } from 'valtio';

// Initializing with a proper iterable type (e.g., array)
const proxyState = proxy({
  items: [],
});

// Initializing with an object
const proxyObjectState = proxy({
  data: {},
});


export default function Picker(props) {
  const snap = useSnapshot(props.state);
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker
        className="picker mx-auto max-w md:max-w-full"
        color={snap.items[snap.current]}
        onChange={(color) => (props.state.items[snap.current] = color)}
      />
      <a className="name_shoe">{snap.current}
      
      </a>
    </div>
  );
}
