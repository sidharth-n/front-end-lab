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

function BackgroundAnimation({ animationName }) {
  const model = useGLTF("./dancingGirl2.gltf");
  model.scene.scale.set(0.04, 0.04, 0.04);
  model.scene.position.set(0, 1, 0);

  const animations = useAnimations(model.animations, model.scene);

  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();
    /* const music = new Audio(bgm);
    music.play(); */
    return () => {
      action.fadeOut(2);
    };
  }, [animationName]);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} intensity={3} />
      <primitive object={model.scene} receiveShadow />
      <OrbitControls makeDefault />
    </Canvas>
  );
}

export { BackgroundAnimation };
