# Flappy Bird in TypeScript
This is a basic TypeScript/javasript implementation of the controversial **Flappy Bird** game. Try it [here](https://ernestmarcinko.com/flappybird/).


## Installation

```
npm install flappybird-ts
```

Then:

```js
import FlappyBird from "flappybird-ts";

document.addEventListener('DOMContentLoaded', ()=>{
    new FlappyBird('game');
});
```

In your HTML file make sure to have a canvas element with the ID you pass to the FlappyBird constructor.

```html
<html>
    <body>
        <canvas id="game"></canvas>
    </body>
</html>
```

## How to run locally

```
npm run build
```

..then open `index.html` to try.

## Development

```
npm run build:dev
```

..then webpack will automatically recompile the `FlappyBird.js`