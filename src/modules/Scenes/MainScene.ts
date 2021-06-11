import { Scene } from "phaser";
import { FONT, FONT_BIG, BACKGROUND } from "@/services/const";
export default class BootScene extends Scene {
  constructor() {
    super({ key: "main" });
    console.log("main");
  }
  preload(): void {
    this.load.image("font", "/assets/font_game.png");
    this.load.image("font_2x", "/assets/font_big.png");
  }
  create(): void {
    this.cameras.main.setBackgroundColor(BACKGROUND);
    //
    this.cache.bitmapFont.add(
      "font_2x",
      Phaser.GameObjects.RetroFont.Parse(this, FONT_BIG)
    );
    this.cache.bitmapFont.add(
      "font",
      Phaser.GameObjects.RetroFont.Parse(this, FONT)
    );
    //  Save viewport center coordinates for reference.
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;
    const startButton = this.add
      .bitmapText(x - 10, y + 130, FONT_BIG.image, "START GAME")
      .setOrigin(0.5, 1);
    //  Handle the click or tap of the button using an input zone slightly
    //  bigger than the text object.
    this.add
      .zone(
        // prettier-ignore
        startButton.x - ( startButton.width * startButton.originX ) - 16,
        // prettier-ignore
        startButton.y - ( startButton.height * startButton.originY ) - 16,
        startButton.width + 32,
        startButton.height + 32
      )
      .setOrigin(0, 0)
      .setInteractive()
      .once("pointerup", () => this.scene.start("BootScene"));
  }
}
