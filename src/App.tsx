import { Application, extend } from "@pixi/react";
import { Container, Sprite } from "pixi.js";
import { Player } from "./objects/Player";
import { Food } from "./objects/Food";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Sprite,
});

export default function App() {
  const player = new Player()
  const foods = new Food()

  return (
    // We'll wrap our components with an <Application> component to provide
    // the Pixi.js Application context
    <Application background={"#1099bb"} resizeTo={window}>
      <foods.FoodsSprite />
      <player.PlayerSprite />
    </Application>
  );
}
