import fs from 'node:fs';
import path from 'node:path';
import SVGSprite from 'svg-sprite';

const iconDirectory = './src/assets/icons/';
const spriter = new SVGSprite({
	dest: './src/assets/sprite',
	mode: {
		stack: {
			dest: '',
			sprite: 'sprite.svg'
		}
	}
});

if (fs.existsSync(iconDirectory)) {
	const files = fs.readdirSync(iconDirectory);

	files.forEach(file => {
		if (!file.endsWith('.svg')) return;

		const iconPath = path.join(iconDirectory, file);

		spriter.add(iconPath, null, fs.readFileSync(iconPath, 'utf-8'));
	});

	spriter.compile((error, result) => {
		for (const mode of Object.values(result)) {
			for (const resource of Object.values(mode)) {
				fs.mkdirSync(path.dirname(resource.path), { recursive: true });
				fs.writeFileSync(resource.path, resource.contents);
			}
		}
	});
}
