"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import SceneInit from "@/lib/scene-init";

export function ManekiNeko() {
  useEffect(() => {
    const container = document.getElementById("main-canvas")
      ?.parentElement as HTMLElement;

    const canvas = new SceneInit("main-canvas", container);
    canvas.initialize();

    let model: THREE.Group | null = null;
    let rightArm: THREE.Object3D | null = null;
    let rightArmBaseX = 0;

    const loader = new GLTFLoader();

    loader.load("./assets/neko/scene.gltf", (gltf: GLTF) => {
      model = gltf.scene;

      model.rotation.y = Math.PI / -8;
      model.rotation.x = Math.PI / 8;
      model.position.y = -9;
      model.scale.set(8, 8, 8);

      model.traverse((obj: THREE.Object3D) => {
        if (obj.name === "4-RightArm") {
          rightArm = obj;
          rightArmBaseX = obj.rotation.x;
        }
      });

      canvas.scene!.add(model);
    });

    const animate = () => {
      requestAnimationFrame(animate);

      if (!model || !rightArm || !canvas.clock) return;

      const t = canvas.clock.getElapsedTime();

      const liftOffset = 0.4;
      const waveAmount = 0.3;

      rightArm.rotation.x =
        rightArmBaseX + liftOffset + Math.sin(t * 3) * waveAmount;

      canvas.renderer!.render(canvas.scene!, canvas.camera!);
    };

    animate();

    return () => {
      window.removeEventListener("resize", canvas.onWindowResize);

      if (model) {
        canvas.scene!.remove(model);
      }
      canvas.renderer!.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        id="main-canvas"
        className="max-w-full max-h-full object-contain rounded-lg"
      />
    </div>
  );
}
