module.exports = (
    animationName = null,
    animationDuration = 0,
    animationTimingFunction = "ease",
    animationDelay = 0,
    animationIterationCount = 1,
    animationInfinite=false,
    animationDirection = "normal",
    animationFillMode = "none"
  ) => {
  
    let animation_shorthand = ``;
    animationName ? (animation_shorthand += "" + animationName) : null;
  
    animationDuration && animationDuration != 0
      ? (animation_shorthand += " " + String(animationDuration).concat("ms"))
      : (animation_shorthand += " 1s ");
  
    animationTimingFunction
      ? (animation_shorthand += " " + animationTimingFunction)
      : null;
  
    animationDelay
      ? (animation_shorthand +=
          " " + (animationDelay === 0 ? "" : String(animationDelay).concat("ms")))
      : null;
  
      (animationIterationCount || !animationIterationCount) && !animationInfinite
      ? (animation_shorthand +=
          " " + (animationIterationCount === 1 ? "" : ` ${animationIterationCount} `))
      : null;

      (animationIterationCount || !animationIterationCount) && animationInfinite
      ?(animation_shorthand+=" infinite ")
        :
        null;

    animationDirection
      ? (animation_shorthand +=
          " " + (animationDirection == "normal" ? "" : animationDirection))
      : null;
  
    animationFillMode
      ? (animation_shorthand +=
          " " + (animationFillMode == "none" ? "" : animationFillMode))
      : null;
      
    return animation_shorthand;
  };