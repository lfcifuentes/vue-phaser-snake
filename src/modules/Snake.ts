import Food from "./Food";
import { LENGTH, WIDTH, HEIGHT } from "@/services/const";
import BadFood from "./BadFood";
import Wall from "./Wall";

export default class Snake {
  body: Phaser.GameObjects.Group;
  head: Phaser.GameObjects.Group;
  direction: Phaser.Geom.Point;
  headPosition: Phaser.Geom.Point;
  tailPosition: Phaser.Geom.Point;
  alive: boolean;
  moveTime: number;
  is_updated: boolean;
  is_move: boolean;
  moveDelay: number;
  moveDirection: string;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.body = scene.add.group({
      defaultKey: "body",
      createCallback: (o: any) => o.setOrigin(0),
    });
    this.head = this.body.create(x * LENGTH, y * LENGTH);
    this.direction = new Phaser.Geom.Point(LENGTH, 0);
    this.headPosition = new Phaser.Geom.Point(0, 0);
    this.tailPosition = new Phaser.Geom.Point(0, 0);
    this.alive = true;
    this.is_updated = true;
    this.is_move = true;
    this.moveTime = 0;
    this.moveDelay = 50;
    this.moveDirection = "right";
  }
  /*turnLeft(): void {
    if (this.is_updated && this.moveDirection != "right") {
      this.direction.setTo(-LENGTH, 0);
      this.is_updated = false;
      this.moveDirection = "left";
    }
  }
  turnRight(): void {
    if (this.is_updated && this.moveDirection != "left") {
      this.direction.setTo(LENGTH, 0);
      this.is_updated = false;
      this.moveDirection = "right";
    }
  }
  turnUp(): void {
    if (this.is_updated && this.moveDirection != "down") {
      this.direction.setTo(-0, -LENGTH);
      this.is_updated = false;
      this.moveDirection = "up";
    }
  }
  turnBottom(): void {
    if (this.is_updated && this.moveDirection != "up") {
      this.direction.setTo(-0, LENGTH);
      this.is_updated = false;
      this.moveDirection = "down";
    }
  }
  update(time: number): boolean {
    if (time >= this.moveTime) {
      this.is_updated = true;
      return this.move();
    }
    return false;
  }*/
  moveTo(x: number, y: number): boolean {
    if (x == this.head.x && y == this.head.y) {
      this.is_move = false;
      return false;
    }
    this.is_move = true;
    if (x > this.head.x) {
      this.moveDirection = "right";
    } else if (x < this.head.x) {
      this.moveDirection = "left";
    }
    if (y > this.head.y) {
      this.moveDirection = "down";
    } else if (y < this.head.y) {
      this.moveDirection = "up";
    }
    this.head.x = x;
    this.head.y = y;
    this.move();
    return false;
  }
  move(): boolean {
    //  Actualiza la posición de la serpiente de acuerdo con la dirección
    // en la que el jugador quiere que se mueva. La llamada a la función
    // `Math.Wrap` permite que la serpiente se enrolle alrededor de los bordes
    // de la pantalla, por lo que cuando se sale de cualquier lado debería
    // reaparecer en el lado opuesto.
    this.headPosition.setTo(
      Phaser.Math.Wrap(this.head.x, 0, WIDTH * LENGTH),
      Phaser.Math.Wrap(this.head.y, 0, HEIGHT * LENGTH)
    );
    if (this.is_move) {
      this.is_move = false;
      Phaser.Actions.ShiftPosition(
        this.body.children.entries,
        this.headPosition.x,
        this.headPosition.y,
        1,
        this.tailPosition
      );
      // Actualiza los segmentos del cuerpo y coloca la última coordenada en "this.tailPosition".
    }
    //  Check to see if any of the body pieces have the same x/y as the head.
    //  If they do, the head ran into the body.
    if (this.hitBody()) {
      this.die();
      return false;
    }

    //  Update the timer ready for the next movement.
    //this.moveTime = time + this.moveDelay;

    return true;
  }
  hitBody(): boolean {
    const head: Phaser.GameObjects.GameObject = this.body.getChildren()[0];
    let result = false;
    this.body.getChildren().map((e: any, i: number): any => {
      if (i > 1) {
        if (e.x == head.x && e.y == head.y) {
          result = true;
        }
      }
    });
    return result;
  }
  collideWithFood(food: Food, points: number): boolean {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.grow();
      //  For every 5 pieces of food eaten we'll increase the snake speed a
      //  little.
      if (this.moveDelay > 20 && points % 25 === 0) {
        this.moveDelay -= 5;
      }
      return true;
    }
    return false;
  }
  collideWithFoodRed(bad_food: BadFood): boolean {
    const head: Phaser.GameObjects.GameObject = this.body.getChildren()[0];
    let result = false;
    bad_food.body.getChildren().map((e: any, i: number): any => {
      if (e.x == head.x && e.y == head.y) {
        result = true;
        e.destroy();
      }
    });
    if (result) {
      this.decrease();
    }
    return result;
  }
  collideWithWall(wall: Wall): boolean {
    const head: Phaser.GameObjects.GameObject = this.body.getChildren()[0];
    let result = false;
    wall.body.getChildren().map((e: any, i: number): any => {
      if (e.x == head.x && e.y == head.y) {
        result = true;
      }
    });
    return result;
  }
  grow(): void {
    this.is_updated = false;
    if (
      this.tailPosition.x === this.headPosition.x &&
      this.tailPosition.y == this.headPosition.y
    ) {
      this.body.create(this.tailPosition.x, this.tailPosition.y);
      if (this.moveDirection == "left") {
        this.tailPosition.x += LENGTH;
      } else if (this.moveDirection == "right") {
        this.tailPosition.x -= LENGTH;
      } else if (this.moveDirection == "down") {
        this.tailPosition.y -= LENGTH;
      } else if (this.moveDirection == "up") {
        this.tailPosition.y += LENGTH;
      }
    }
    this.body.create(this.tailPosition.x, this.tailPosition.y);
  }
  decrease(): void {
    if (this.body.getLength() > 3) {
      this.body.getChildren()[this.body.getLength() - 1].destroy();
      this.body.getChildren()[this.body.getLength() - 1].destroy();
    } else {
      this.die();
    }
  }
  updateGrid(grid: boolean[][]): boolean[][] {
    //  Remove all body pieces from valid positions list.
    for (const segment of this.body.getChildren()) {
      const x = segment.x / LENGTH;
      const y = segment.y / LENGTH;
      if (grid[y] && grid[y][x]) {
        grid[y][x] = false;
      }
    }
    // const objects = this.map.getObjectLayer("objects").objects as any[];

    return grid;
  }
  die(): boid {
    this.alive = false;
  }
}
