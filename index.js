const defaults = require("./animista__defaults")
const mixin = require("./utils/index")


module.exports = ({
  classes = [],
  settings = {},
  variants = ['responsive']
}) => {

  if (!settings) {
    settings = {}
  }

  if (!classes) {
    classes = []
  }

  if (!variants) {
    variants = []
  }

  return ({ addUtilities }) => {

    let animationsAndKeyframes;

    if (!classes.length) {
      animationsAndKeyframes = mixin(defaults, settings)
    } else {
      animationsAndKeyframes = mixin(classes, settings)
    }

    const animistaAnimationsUtilities = animationsAndKeyframes
      .animations
      .map((item) => {
        const key = Object.keys(item)[0];
        const value = Object.values(item)[0]

        return {
          [`.${key}`]: {
            animation: value
          }
        }
      })

    const animistaKeyframesUtilities = animationsAndKeyframes
      .keyframes
      .map((item) => {
        const key = Object.keys(item)[0].split(" ")[1];
        const value = Object.values(item)[0]

        return {
          [`@keyframes ${key}`]: value
        }
      })

    addUtilities(animistaAnimationsUtilities, {
      variants
    })

    addUtilities(animistaKeyframesUtilities)
  }
}