import { EffectComposer } from "@react-three/postprocessing";
import { Noise, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Effects = () => {
  return (
    <EffectComposer multisampling={4} disableNormalPass>
      {/* Enhanced chromatic aberration */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0009, 0.0009]}
        // radialModulation={true}
        modulationOffset={0.15}
      />

      {/* Subtle grain */}
      <Noise opacity={0.05} />
    </EffectComposer>
  );
};

export default Effects;
