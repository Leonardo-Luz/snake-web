import { useApplication, useTick } from "@pixi/react";
import { Assets, Sprite, Texture, Ticker } from "pixi.js";
import { useEffect, useRef, useState } from "react";

export class Player {
  private spriteRef = useRef<Sprite>(null);
  private keys = useRef<{ [key: string]: boolean }>({})
  private speed = useRef(20)
  private timer = useRef(0)
  private body = useState([{ x: 40, y: 40 }])

  public playerInput = () => {
    if (!this.spriteRef.current) return;

    const UP = 1,
      RIGHT = 2,
      DOWN = 3,
      LEFT = 4

    if (this.keys.current["h"])
      return LEFT
    if (this.keys.current["j"])
      return DOWN
    if (this.keys.current["k"])
      return UP
    if (this.keys.current["l"])
      return RIGHT
  }

  public move = (direc: number, ticker: Ticker) => {
    if (!this.spriteRef.current) return;

    const UP = 1,
      RIGHT = 2,
      DOWN = 3,
      LEFT = 4

    this.timer.current += ticker.deltaMS

    if (this.timer.current > 200) {

      let before: { x: number, y: number }

      this.body[1](prev => {
        const aux: { x: number, y: number }[] = [];
        prev.forEach((part, index) => {
          if (!this.spriteRef.current) return;

          if (index == 0) {
            if (direc == UP)
              this.spriteRef.current.y -= this.speed.current * Math.round(ticker.deltaTime);
            else if (direc == RIGHT)
              this.spriteRef.current.x += this.speed.current * Math.round(ticker.deltaTime);
            else if (direc == DOWN)
              this.spriteRef.current.y += this.speed.current * Math.round(ticker.deltaTime);
            else if (direc == LEFT)
              this.spriteRef.current.x -= this.speed.current * Math.round(ticker.deltaTime);

            before = { x: this.spriteRef.current.x, y: this.spriteRef.current.y }
          }
          const temp = part
          part = before
          before = temp

          aux.push(part)
        })

        return aux
      })

      this.timer.current = 0
    }
  }

  public PlayerSprite = () => {
    const { app } = useApplication()
    const [direc, setDirec] = useState(0)

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
      const aux = this.playerInput()
      setDirec(prev => {
        const UP = 1,
          RIGHT = 2,
          DOWN = 3,
          LEFT = 4

        if (this.keys.current["v"])
          alert(JSON.stringify(this.body[0]))

        if (this.keys.current["i"])
          this.body[1](prev => {
            if (!this.spriteRef.current) return prev

            return [{ x: this.spriteRef.current.x, y: this.spriteRef.current.y }, ...prev]
          })

        if (!aux || (prev == UP && aux == DOWN) || (prev == DOWN && aux == UP) || (prev == LEFT && aux == RIGHT) || (prev == RIGHT && aux == LEFT))
          return prev

        return aux
      })
      this.move(direc, ticker)
    })

    return (
      this.body[0].map(part => {
        const sprite = <pixiSprite
          ref={this.spriteRef}
          texture={texture}
          anchor={0.5}
          x={part.x}
          y={part.y}
        />

        // if (this.spriteRef.current) {
        //   this.spriteRef.current.x = part.x
        //   this.spriteRef.current.y = part.y
        // }

        return sprite
      })
    );
  }
}
