import { fileURLToPath } from 'url';
import { join, dirname } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
	components: 'src/components/**/*.webc',
	helpers: {
		inlineSvg: function(src, attributes) {
			if (!src.endsWith('.svg')) throw new Error('Not an svg file.');

			const file = join(__dirname, src);

			if (!existsSync(file)) throw new Error(`File ${file} does not exists.`);

			const svg = readFileSync(file, 'utf-8');

			if (!svg) throw new Error('File is empty');

			const dom = (new JSDOM(svg, { contentType: 'image/svg+xml' }));
			const root = dom.window.document.documentElement;

			for (const key in attributes) {
				root.setAttribute(key, attributes[key]);
			}

			return dom.serialize();
		}
	}
}