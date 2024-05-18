import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls,
} from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { proxy, useSnapshot } from "valtio";
import html2canvas from "html2canvas"; // For capturing screenshots

import ShoeModel from "./Shoe-draco";
import fetchTest from "./api";
import Picker from "./Picker";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
// laces: "#ffffff",
// mesh: "#ffffff",
// caps: "#ffffff",
// inner: "#ffffff",
// sole: "#ffffff",
// stripes: "#ffffff",
// band: "#ffffff",
// patch: "#ffffff",
const state = proxy({
  count: 0,
  current: null,
  items: {},
});
console.log(state.items);

export default function ShoeSider() {
  const divRef = useRef(null); // Reference to the div to capture
  const navigate = useNavigate(); // For navigation to another page

  const handleCapture = async () => {
    // Use html2canvas to capture the screenshot
    const canvas = await html2canvas(divRef.current, {
      backgroundColor: null, // Optional, helps with transparency handling
    });

    // Get the image data in base64 format
    const imageData = canvas.toDataURL("image/png");

    // Navigate to the next page, passing the image data
    navigate("/next", {
      state: { screenshot: imageData }, // Using React Router's state to pass the image
    });
  };

  function addComponentFromText(compFunc) {
    window.React = React;
    eval(compFunc);
    const NewComp = window.NewComp;
    console.log(NewComp);
  }

  const Shoe = () => {
    addComponentFromText(
      //text này có thể load từ server
      <fetchTest />
      //  function NewComp(props) { return React.createElement('h2', {},'New component')}
    );
    // setUpdate(!update);
  };
  return (
    <>
      <div  ref={divRef} className="grid w-96 h-96  overflow-y-hidden max-w-sm md:max-w-full">
        <Canvas
          className="canvas flex "
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 4], fov: 50 }}
        >
          <ambientLight intensity={0.7} />
          <spotLight
            intensity={0.5}
            angle={0.1}
            penumbra={1}
            position={[10, 15, 10]}
            castShadow
          />
          <Suspense fallback={null}>
            <ShoeModel state={state} />
            <Environment preset="city" />
            <ContactShadows
              rotation-x={Math.PI / 2}
              position={[0, -0.8, 0]}
              opacity={0.25}
              width={10}
              height={10}
              blur={1.5}
              far={0.8}
            />
          </Suspense>
          <OrbitControls />
        </Canvas>
        <Picker state={state} />

        {/* <button onClick={handleCapture} className="text-xl font-bold mb-8 overflow-y-hidden flex gap-2 justify-center items-center border-black rounded border-2 w-max px-3 py-2">
          <FontAwesomeIcon icon={faCamera} />
          <span>Capture The Best</span>
        </button> */}
      </div>
    </>
  );
}
