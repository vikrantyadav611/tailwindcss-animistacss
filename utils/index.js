const fs = require('fs')
const csstree = require("css-tree")
const Mensch__Classes__AST = require("../AST/Mensch__Classes__AST.json")
const { convert } = require("@americanexpress/css-to-js");
const settingsHandler=require("./settingsHandler")
const path = require('path')


const keyframes__CSS__string = fs.readFileSync(path.join(__dirname,"../CSS/animista__keyframes.css"), {
  encoding: "utf8"
})

const CSSTree__keyframes__AST = csstree.parse(keyframes__CSS__string)

const func = (class_) => {
  try {
    const specific__selector__keyframe = []

    csstree.walk(CSSTree__keyframes__AST, function (node) {
      if (node && node.name === "keyframes") {

        const keyframe=Object.values(convert(csstree.generate(node)))[0];

        if(!class_.length){
          return specific__selector__keyframe.push(keyframe)        
        }else{
          class_.forEach((c=>{
            if (node.prelude.children.head.data.name === c.replace("animate__","")) {
              return specific__selector__keyframe.push(keyframe)
            }
          }))
        }
      }
    });

    return specific__selector__keyframe;
  }
  catch (err) {
  }
}

const func_ = (class_, settings) => {

  try {

    const animista__css__rules = Object
      .values(Mensch__Classes__AST)
      .filter(item => Boolean(item))[0]
      .map(node => {
        if (node.selectorText && node.style) {
          const AST__selector__name = node.selectorText.split(".")[1];

          if(class_.includes(AST__selector__name)){

            if(!settings[AST__selector__name]){
              return {
                    [`${AST__selector__name}`]: node.style.animation
              } 
            }
            else{
              return settingsHandler(AST__selector__name,node,settings)
            }

          }
          else if(!class_.length){

            if(!settings[AST__selector__name]){
              return {
                [`${AST__selector__name}`]: node.style.animation
              } 
            }
            else{
              return settingsHandler(AST__selector__name,node,settings)
            }
          }
        }
      });
      
    return animista__css__rules.filter((node) => Boolean(node))
  }
  catch (err) {
  }
}

module.exports = (class_, entries) => {

  return {
    selectorNames: class_,
    animations: func_(class_, entries),
    keyframes: func(class_)
  }
}