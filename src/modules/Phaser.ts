import Phaser from "phaser";
import BootScene from "./Scenes/BootScene";
import MainScene from "./Scenes/MainScene";
class PhaserSetup {
  public game: Phaser.Game;
  constructor(containerId: string) {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 900,
      height: 630,
      parent: containerId,
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
        },
      },
      scene: [MainScene, BootScene],
    });
  }
}
export default PhaserSetup;
