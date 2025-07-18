import { Suspense } from 'react';
import ThreeScene from './three-scene';

interface SplineSceneProps {
  scene?: string;
  className?: string;
}

const SplineScene = ({ className = "" }: SplineSceneProps) => {
  // Using React Three Fiber for reliable 3D visualization
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="spline-loader"></div>
        </div>
      }>
        <ThreeScene />
      </Suspense>
    </div>
  );
};

export default SplineScene;