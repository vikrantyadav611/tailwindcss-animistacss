const animationPropertyGen=require("./animationPropertyGenerator")

module.exports= (
    AST__selector__name,
    node,
    settings
) =>{
    return Object.entries(settings).map((([key,values]) => {
        if (key!==AST__selector__name) {
          return;
        }

        const anim_prop=node.style.animation;  // bounceIn 2s linear infinite both;

        const currentSetting=Object.keys(values);

        let animation_name=anim_prop.split(" ")[0]

        let animation_duration = currentSetting.includes('duration')? `${values['duration']}` : Number(anim_prop.split(" ")[1].split("s")[0])*1000;

        let animation_delay = currentSetting.includes('delay') ?  `${values['delay']}`: '0';
        let animation_fill_mode = currentSetting.includes('fillMode') ? `${values['fillMode']}` : anim_prop.match(
          /none|forwards|backwards|both/g
        )[0];
        let animation_direction = currentSetting.includes('direction') ? `${values['direction']}` : anim_prop.includes("alternate")
          ? "alternate"
          : "";

        let animationTimingFunc = (anim_prop) => {

          if (!anim_prop.includes("cubic")) {
            return anim_prop.split(" ")[2];
          } else {
            let isCubic = anim_prop.match(/cubic(([^)]*))/g)[0];

            return isCubic.concat(")");
          }
        };

        let animation_timing_function= currentSetting.includes('timingFunction')? `${values['timingFunction']}` : animationTimingFunc(anim_prop)

        let isAnimInfinite = (anim_prop) => {
          if (anim_prop.includes("infinite")) {
            return true;
          } else {
            return false;
          }
        };

        let animation_infinite=currentSetting.includes('isInfinite') ? values['isInfinite'] : isAnimInfinite(anim_prop) ;

        let animation_iteration_count=currentSetting.includes('iterationCounts')?`${values['iterationCounts']}` : 1;

        return {
          [`${AST__selector__name}`]: animationPropertyGen(
            animation_name,
            animation_duration,
            animation_timing_function,
            animation_delay,
            animation_iteration_count,
            animation_infinite,
            animation_direction,
            animation_fill_mode
          )
        }
    })).filter((node)=>Boolean(node))[0]
  }