# Animista CSS - Tailwind CSS Plugin
Add [Animista CSS](https://animista.net/) as [Tailwind CSS](https://github.com/tailwindcss/tailwindcss) plugin to your project.

## Installation

Pull it in through npm or yarn:

```bash
npm install tailwindcss-animistacss
```

```bash
yarn add tailwindcss-animistacss
```


## Usage

```js
const tailwindCSSAnimista =require("tailwindcss-animistacss")

plugins: [
  // Other plugins
  tailwindCSSAnimista({
        classes:['animate__tracking-in-expand'],
        settings:{
          'animate__tracking-in-expand':{
            duration:7000,
            delay:1000,
            iterationCounts:2,
            isInfinite:true,
          }
        },
        variants:["responsive"]
      }),
]
```
Pass a list of classes that you want to use to `classes` option

Setting **isInfinite** to true removes the IterationCounts value from generated animation css property as this library has given more priority to `infinite` over `iteration-count`. upon falsy, value for iterationCounts will be used.


You can find all available class names at [Tail-Animista](https://tail-animista.vercel.app/)

**Defining the classes is recommended to avoid to bloat your css with unused classes and keyframes.**

```js
const tailwindCSSAnimista =require("tailwindcss-animistacss")

plugins: [
  // Other plugins
  tailwindCSSAnimista({
        classes: ['animate__tracking-in-expand', 'animate__scale-up-center', ...],
        settings: {},
        variants: [],
      }),
]
```

If you want to prefix your CSS classes, use the tailwind prefix option:

```js
// tailwind.config.js
module.exports = {
  prefix: 'tw-',
  // ...
}
```
### Adjustable Settings under each class settings option

`* duration: number (ms)`


`* delay: number (ms) //default: 0ms`


`* iterationCounts: number //default: 1`


`* isInfinite: boolean`


`* direction: string`


`* fillMode: string //default: both`


`* timingFunction: string`


### Variants
Generating different class variants is super easy, just add the desired variant to the variants array at the plugin options.
```js
plugins: [
  // Other plugins
  require('tailwindcss-animistacss')({
        classes: [],
        settings: {},
        variants: ['responsive', 'hover', 'focus'],
      }),
]
```
#### Available variants
* responsive
* hover
* focus



## Credits

This package is based on awesome [Animista.net](https://animista.net/).


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
