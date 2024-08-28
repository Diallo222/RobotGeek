import {
  EffectComposer,
  Noise,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// You can play with those
const Effects = () => {
  return (
    <>
      <EffectComposer multisampling={0} disableNormalPass={true}>
        <Noise opacity={0.04} />
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
