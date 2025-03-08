import { useApplication, useTick } from "@pixi/react";
import { Assets, Sprite, Texture, Ticker } from "pixi.js";
import { useEffect, useRef, useState } from "react";

export class Food {
  private spriteRef = useRef<Sprite>(null);

  public FoodsSprite = () => {
    const { app } = useApplication()

    const [texture, setTexture] = useState(Texture.EMPTY);

    const MAX_FOODS = 5;
    const [foods, setFoods] = useState<{ x: number, y: number }[]>([])

    const timer = useRef<number>(0)

    useEffect(() => {
      if (texture === Texture.EMPTY) {
        Assets.load("/assets/bunny.png").then((result) => {
          setTexture(result);
        });
      }
    }, [texture]);

    useEffect(() => {
    }, [])

    useTick((ticker) => {
      timer.current += ticker.deltaMS

      if (timer.current > 5000 && foods.length < MAX_FOODS) {
        setFoods((foods) => {
          const newFood = {
            x: Math.random() * app.screen.width,
            y: Math.random() * app.screen.height,
          }

          return [
            ...foods,
            newFood
          ]
        })

        timer.current = 0
      }
    })

    return (
      foods.map(food =>
        <pixiSprite
          ref={this.spriteRef}
          texture={texture}
          anchor={0.5}
          x={food.x}
          y={food.y}
        />
      )
    );
  }
}
