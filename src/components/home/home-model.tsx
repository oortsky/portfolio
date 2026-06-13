import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { m } from "@/paraglide/messages.js";

import SceneInit from "@/lib/scene-init";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Spinner } from "@/components/ui/spinner";

export function HomeModel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current.parentElement as HTMLElement;

    const scene = new SceneInit(canvasRef.current.id, container);

    scene.initialize();

    let frameId = 0;
    let model: THREE.Group | null = null;
    let rightArm: THREE.Object3D | null = null;
    let rightArmBaseX = 0;

    const loader = new GLTFLoader();

    loader.load(
      "/assets/neko/scene.gltf",

      (gltf: GLTF) => {
        model = gltf.scene;

        model.rotation.y = -Math.PI / 8;
        model.rotation.x = Math.PI / 8;

        model.position.y = -9;

        model.scale.set(8, 8, 8);

        model.traverse((object: THREE.Object3D) => {
          if (object.name === "4-RightArm") {
            rightArm = object;
            rightArmBaseX = object.rotation.x;
          }
        });

        scene.scene?.add(model);

        setIsLoading(false);
      },

      undefined,

      error => {
        console.error("Failed to load model:", error);
        setIsLoading(false);
      }
    );

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!model || !rightArm || !scene.clock) return;

      const t = scene.clock.getElapsedTime();

      rightArm.rotation.x = rightArmBaseX + 0.4 + Math.sin(t * 3) * 0.3;

      scene.renderer?.render(
        scene.scene as THREE.Scene,
        scene.camera as THREE.Camera
      );
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener("resize", scene.onWindowResize);

      if (model) {
        scene.scene?.remove(model);

        model.traverse(object => {
          const mesh = object as THREE.Mesh;

          if (mesh.geometry) {
            mesh.geometry.dispose();
          }

          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach(material => material.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        });
      }

      scene.renderer?.dispose();
    };
  }, []);

  return (
    <figure className="space-y-4">
      <AspectRatio
        ratio={1}
        className="relative overflow-hidden rounded-xl bg-muted/10"
      >
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Spinner className="size-6" />
          </div>
        )}

        <canvas ref={canvasRef} id="main-canvas" className="h-full w-full" />
      </AspectRatio>
      <figcaption className="text-center max-w-md w-full mx-auto">
        <span className="text-sm text-muted-foreground leading-relaxed">
          {m["home_model.credits"]()}:{" "}
          <a
            href="https://skfb.ly/oEQZ6"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            "Lucky cat maneki neko"
          </a>{" "}
          {m["home_model.by"]()} Rice & Soy Sauce{" "}
          {m["home_model.licensed_under"]()}{" "}
          <a
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Creative Commons Attribution
          </a>
          .
        </span>
      </figcaption>
    </figure>
  );
}
