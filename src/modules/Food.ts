import Snake from "./Snake";
import BadFood from "./BadFood";
import { LENGTH, WIDTH, HEIGHT } from "@/services/const";
import Wall from "./Wall";

const check = (num: number | undefined): number => {
  if (num) {
    return num;
  }
  return Phaser.Math.Between(10, 20);
};

export default class Food extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, image: string, x?: number, y?: number) {
    x = check(x);
    y = check(y);
    super(scene, x * LENGTH, y * LENGTH, image);
    this.setOrigin(0);
    this.setVisible(true);
    scene.children.add(this);
  }
  reposition(snake: Snake, bad_food: BadFood, walls: Wall): boolean {
    //  Primero, cree una cuadrícula que asuma que todas las posiciones
    // son válidas para el nuevo alimento.
    const testGrid = Array.from(
      {
        length: HEIGHT,
      },
      () =>
        Array.from(
          {
            length: WIDTH,
          },
          () => true
        )
    );

    snake.updateGrid(testGrid);
    if (snake.alive) {
      bad_food.updateGrid(testGrid);
      walls.updateGrid(testGrid);
    }
    //  Purgue las posiciones falsas.
    const validLocations = [];

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (testGrid[y][x] === true) {
          //  Is this position valid for food? If so, add it here...
          validLocations.push({ x, y });
        }
      }
    }

    if (validLocations.length > 0) {
      //  Use the RNG to pick a random food position.
      const pos = Phaser.Math.RND.pick(validLocations);

      //  And place it.
      this.setPosition(pos.x * LENGTH, pos.y * LENGTH);

      return true;
    }

    return false;
  }
}
