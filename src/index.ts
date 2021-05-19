/**
 * @author       Nikolas Schwarz <nikolas.schwarz@evolut.solutions>
 * @copyright    2021 evolut.solutions
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Phaser from 'phaser'

import {isMobile} from './helper'
import './assets/styles/style.scss';

import PlaceholderScene from './scenes/PlaceholderScene'

const ISMOBILE = isMobile.any();

// hide no js
document.getElementById('no-js')!.style.display = "none";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
	    mode: (ISMOBILE ? Phaser.Scale.NONE : Phaser.Scale.FIT),
	    autoCenter: (ISMOBILE ? Phaser.Scale.NONE : Phaser.Scale.CENTER_BOTH),
		width: (ISMOBILE ? window.innerWidth : 1280),
		height: (ISMOBILE ? window.innerHeight: 960)
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [PlaceholderScene],
	disableContextMenu: true,
	audio: {
		disableWebAudio: true
	}
}

export const game = new Phaser.Game(config)