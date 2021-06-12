import { Scene } from "phaser";
import Food from "@/modules/Food";
import BadFood from "@/modules/BadFood";
import Snake from "@/modules/Snake";
import store from "@/store";
import Wall from "@/modules/Wall";
import { Pointer } from "@/services/interfaces";
import { OBSTACLES, BACKGROUND } from "@/services/const";
export default class BootScene extends Scene {
  food_count: number;
  food!: Food;
  bad_food!: BadFood;
  snake!: Snake;
  walls!: Wall;
  points: number;
  //cursors: `Record<string, unknown>` | undefined;
  gameOverLabel!: Phaser.GameObjects.BitmapText;
  constructor() {
    super({ key: "BootScene" });
    // contadores
    this.points = 0;
    this.food_count = 0;
  }
  preload(): void {
    // precargar imagenes del juego
    this.load.image("wall", "/assets/wall.png");
    this.load.image("apple", "/assets/apple.png");
    this.load.image("green_apple", "/assets/green_apple.png");
    this.load.image("body", "/assets/body.png");
    this.load.image("snake_die", "/assets/snake_die.png");
  }
  create(): void {
    // fondo del juego
    this.cameras.main.setBackgroundColor(BACKGROUND);
    // objetos del juego
    this.food = new Food(this, "green_apple");
    this.snake = new Snake(this, 8, 8);
    this.bad_food = new BadFood(this);
    this.walls = new Wall(this);
    // //  Create our keyboard controls.
    // this.cursors = this.input.keyboard.addKeys({
    //   leftKey: Phaser.Input.Keyboard.KeyCodes.LEFT,
    //   rightKey: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    //   bottomKey: Phaser.Input.Keyboard.KeyCodes.DOWN,
    //   upKey: Phaser.Input.Keyboard.KeyCodes.UP,
    //   mouse: Phaser.Input.MOUSE_MOVE,
    // });
    // labels
  }
  update(time: number): void {
    if (this.snake && this.snake.alive) {
      this.updateInput();
    }
    this.updateLogic(time);
  }
  private updateInput(): void {
    // const { leftKey, rightKey, bottomKey, upKey } = this.cursors;
    //  Check which key was just pressed down, then change the direction the
    this.input.on(
      "pointermove",
      (pointer: Pointer) => {
        const x = Math.ceil(pointer.position.x / 30) * 30 - 30;
        const y = Math.ceil(pointer.position.y / 30) * 30 - 30;
        this.snake.moveTo(x, y);
      },
      this
    );

    // snake is heading.
    // if (Phaser.Input.Keyboard.JustDown(leftKey)) {
    //   this.snake?.turnLeft();
    // } else if (Phaser.Input.Keyboard.JustDown(rightKey)) {
    //   this.snake?.turnRight();
    // } else if (Phaser.Input.Keyboard.JustDown(bottomKey)) {
    //   this.snake?.turnBottom();
    // } else if (Phaser.Input.Keyboard.JustDown(upKey)) {
    //   this.snake?.turnUp();
    // }
  }
  private updateLogic(): void {
    // verificar la colición con la comida
    if (this.snake.collideWithFood(this.food, this.points)) {
      this.updatePoints(5);
      this.food.reposition(this.snake, this.bad_food, this.walls);
      if (this.food_count % OBSTACLES == 0) {
        if (this.insertWall()) {
          // insert pared
          this.walls.insert(this.snake);
        }
        if (this.changeWAllsPosition() && this.walls.body.getLength() > 0) {
          this.walls.reposition(this.snake, this.food, this.bad_food);
        }
      }
      if (this.insertApple()) {
        this.bad_food.insert(this.snake);
      }
    }
    // validar colición con la comida roja
    if (this.snake.alive && this.snake.collideWithFoodRed(this.bad_food)) {
      this.updatePoints(5);
    }
    // validar colición con la pared
    if (this.snake.alive && this.snake.collideWithWall(this.walls)) {
      this.snake.die();
    }

    if (this.snake && !this.snake.alive) {
      this.endGame();
    }
  }
  private endGame(): void {
    if (this.points > 0) {
      console.log("Enviar estos ", this.points);
      store.commit("setBestPoints", this.points);
      store.commit("setPoints", 0);
    }
    this.points = 0;
    this.food.setVisible(false);
    this.bad_food.body.destroy(true);
    this.walls.body.destroy(true);
    this.snake.body.setVisible(false);
    this.snake.head.setVisible(false);
    this.showEndGameLabel();

    this.time.delayedCall(3000, () => {
      this.scene.stop("BootScene").start("main");
    });
  }
  private updatePoints(poin: number) {
    this.food_count++;
    this.points += poin;
    store.commit("setPoints", this.points);
  }
  private insertApple(): boolean {
    return Phaser.Math.Between(1, 12) % 4 == 0;
  }
  private changeWAllsPosition(): boolean {
    return Phaser.Math.Between(1, 9) % 2 == 0;
  }
  private insertWall(): boolean {
    return Phaser.Math.Between(1, 9) % 3 == 0;
  }
  private showEndGameLabel(): void {
    this.add.image(180, -10, "snake_die").setOrigin(0, 0);
    //  Align this label to the right side.
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;
    this.gameOverLabel = this.add
      .bitmapText(x - 150, y + 160, "font_2x", "GAME OVER")
      .setOrigin(0, 0)
      .setVisible(true);
  }
}
