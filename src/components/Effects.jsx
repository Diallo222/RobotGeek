import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  DotScreen,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// You can play with those
const Effects = () => {
  return (
    <>
      <EffectComposer multisampling={0} disableNormalPass={true}>
        <Noise opacity={0.05} />

        {/* <Bloom
          luminanceThreshold={0.2}
          mipmapBlur
          luminanceSmoothing={0}
          intensity={0.2}
        /> */}
        {/* <DotScreen
          blendFunction={BlendFunction.NORMAL} // blend mode
          angle={Math.PI * 0.5} // angle of the dot pattern
          scale={1.0} // scale of the dot pattern
         /> */}
        <ChromaticAberration
          blendFunction={BlendFunction.ALPHA} // blend mode
          offset={[0.0008, 0.0008]} // color offset
        />
        <Vignette eskil={false} offset={0.005} darkness={1} />
      </EffectComposer>
    </>
  );
};
export default Effects;
