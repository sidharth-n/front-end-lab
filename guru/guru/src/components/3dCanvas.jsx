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
  const model = useGLTF("./mice2.gltf");
  model.scene.scale.set(0.06, 0.06, 0.06);
  model.scene.position.set(0, 0, -6);
  model.scene.rotation.set(0, 0, 0);
  const animations = useAnimations(model.animations, model.scene);

  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [animationName]);

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} intensity={3} />
      <primitive object={model.scene} receiveShadow />
    </>
  );
}

export { BackgroundAnimation };
