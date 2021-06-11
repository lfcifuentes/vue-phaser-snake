import { LENGTH, WIDTH, HEIGHT } from "@/services/const";
import Snake from "./Snake";
export default class Wall {
  body: Phaser.GameObjects.Group;
  constructor(scene: Phaser.Scene) {
    this.body = scene.add.group({
      defaultKey: "wall",
      createCallback: (o: any) => o.setOrigin(0),
    });
  }
  protected generateGrid(snake: Snake): boolean[][] {
    const grid = Array.from(
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

    return snake.updateGrid(grid);
  }
  insert(snake: Snake): boolean {
    if (!snake.alive) {
      return false;
    }
    const testGrid: boolean[][] = this.generateGrid(snake);

    const validLocations = [];

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (testGrid[y][x] === true) {
          validLocations.push({ x, y });
        }
      }
    }

    const random = Phaser.Math.RND.shuffle(validLocations);
    const length = Phaser.Math.Between(1, 4);

    for (let index = 0; index < length; index++) {
      this.body.create(random[index].x * LENGTH, random[index].y * LENGTH);
    }
    return true;
  }
  updateGrid(grid: any[]): any[] {
    const data: Phaser.GameObjects.GameObject[] = this.body.getChildren();
    for (let i = 0; i < data.length; i++) {
      const x = data[i].x / LENGTH;
      const y = data[i].y / LENGTH;
      grid[y][x] = false;
    }
    return grid;
  }
  reposition(snake: Snake): void {
    const testGrid: boolean[][] = this.generateGrid(snake);

    const validLocations = [];

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (testGrid[y][x] === true) {
          validLocations.push({ x, y });
        }
      }
    }
    const random = Phaser.Math.RND.shuffle(validLocations);
    this.body.getChildren().map((e, i) => {
      e.x = random[i].x * LENGTH;
      e.y = random[i].y * LENGTH;
    });
  }
}
