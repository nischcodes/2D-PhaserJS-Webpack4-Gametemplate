import Phaser from 'phaser'

export default class PlaceholderScene extends Phaser.Scene {
    
    constructor() {
		super('placeholder')
	}

	preload() {
        this.load.image('logo', 'images/logo.png')
    }

    create() {
        const logo = this.add.image(this.scale.width * 0.5, 150, 'logo');
      
        this.tweens.add({
            targets: logo,
            y: this.scale.height - 150,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}