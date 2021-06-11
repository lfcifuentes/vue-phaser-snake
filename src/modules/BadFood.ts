import { LENGTH, WIDTH, HEIGHT } from "@/services/const";
import Snake from "./Snake";
export default class BadFood {
  body: Phaser.GameObjects.Group;
  constructor(scene: Phaser.Scene) {
    this.body = scene.add.group({
      defaultKey: "apple",
      createCallback: (o: any) => o.setOrigin(0),
    });
  }
  insert(snake: Snake): boolean {
    if (!snake.alive) {
      return false;
    }
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

    const validLocations = [];

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (testGrid[y][x] === true) {
          validLocations.push({ x, y });
        }
      }
    }
    const pos = Phaser.Math.RND.pick(validLocations);
    this.body.create(pos.x * LENGTH, pos.y * LENGTH);
    return true;
  }
  updateGrid(grid: any[]): any[] {
    const data: Phaser.GameObjects.GameObject[] = this.body.getChildren();
    for (let i = 0; i < data.length; i++) {
      // eslint-disable-next-line
      const x = data[i].x / LENGTH;
      // eslint-disable-next-line
      const y = data[i].y / LENGTH;
      grid[y][x] = false;
    }
    return grid;
  }
}
