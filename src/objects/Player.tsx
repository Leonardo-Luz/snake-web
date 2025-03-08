import { useApplication, useTick } from "@pixi/react";
import { Assets, Sprite, Texture, Ticker } from "pixi.js";
import { useEffect, useRef, useState } from "react";

export class Player {
  private spriteRef = useRef<Sprite>(null);
  private keys = useRef<{ [key: string]: boolean }>({})
  private speed = useRef(2)

  public playerInput = (ticker: Ticker) => {
    if (!this.spriteRef.current) return;

    if (this.keys.current["r"])
      this.spriteRef.current.rotation += 0.1 * ticker.deltaTime;

    if (this.keys.current["u"])
      this.speed.current += 0.5
    if (this.keys.current["d"])
      this.speed.current -= 0.5

    if (this.keys.current["h"])
      this.spriteRef.current.x -= this.speed.current * ticker.deltaTime;
    if (this.keys.current["j"])
      this.spriteRef.current.y += this.speed.current * ticker.deltaTime;
    if (this.keys.current["k"])
      this.spriteRef.current.y -= this.speed.current * ticker.deltaTime;
    if (this.keys.current["l"])
      this.spriteRef.current.x += this.speed.current * ticker.deltaTime;
  }

  public PlayerSprite = () => {
    const { app } = useApplication()

    const [texture, setTexture] = useState(Texture.EMPTY);

    useEffect(() => {
      if (texture === Texture.EMPTY) {
        Assets.load("/assets/bunny.png").then((result) => {
          setTexture(result);
        });
      }
    }, [texture]);

    useEffect(() => {
      window.addEventListener('keydown', (e) => {
        this.keys.current[e.key] = true
      })

      window.addEventListener('keyup', (e) => {
        this.keys.current[e.key] = false
      })
    }, [])

    useTick((ticker) => {
      this.playerInput(ticker)
    })

    return (
      <pixiSprite
        ref={this.spriteRef}
        texture={texture}
        anchor={0.5}
        x={app.screen.width / 2}
        y={app.screen.height / 2}
      />
    );
  }
}
