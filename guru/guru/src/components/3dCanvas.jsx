import React from "react";
import { Canvas } from "react-three-fiber";
import {
  OrbitControls,
  useHelper,
  PivotControls,
  BakeShadows,
  AccumulativeShadows,
  Sky,
  Environment,
  Stage,
  useGLTF,
  Clone,
  useAnimations,
} from "@react-three/drei";
import { useRef, useEffect } from "react";

function BackgroundAnimation({ animationName }) {
  const model = useGLTF("./mice.gltf");
  model.scene.scale.set(0.06, 0.06, 0.06);
  model.scene.position.set(-0.5, 1.8, -6);
  model.scene.rotation.set(0, 0, 0);
  const animations = useAnimations(model.animations, model.scene);
  console.log(animations);
  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(2).play();
    /* const music = new Audio(bgm);
    music.play(); */
    return () => {
      action.fadeOut(0.5);
    };
  }, [animationName]);

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} intensity={3} />
      <primitive object={model.scene} receiveShadow />
      {/*  <OrbitControls makeDefault /> */}
    </>
  );
}

export { BackgroundAnimation };
