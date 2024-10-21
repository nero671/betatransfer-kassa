import { Transformer } from '@parcel/plugin';
import * as Webc from '@11ty/webc';

export default new Transformer({
  async loadConfig({ config }) {
    const configFile = await config.getConfig([
      '.webcrc',
      '.webcrc.js',
      '.webcrc.cjs',
      '.webcrc.mjs',
      'webc.config.js',
      'webc.config.cjs',
      'webc.config.mjs',
    ]);

    return configFile?.contents;
  },

  async transform({ asset, config }) {
    const webcConfig = config ?? {};
    const code = await asset.getCode();
    const page = new Webc.WebC();

    page.defineComponents(webcConfig?.components ?? 'components/**.webc');
    page.setBundlerMode(false);

    if (webcConfig?.transforms && typeof webcConfig?.transforms === 'object') {
      for (const transform in webcConfig.transforms) {
        page.setTransform(transform, webcConfig.transforms[transform]);
      }
    }

    if (webcConfig?.helpers && typeof webcConfig?.helpers === 'object') {
      for (const helper in webcConfig.helpers) {
        page.setHelper(helper, webcConfig.helpers[helper]);
      }
    }

    page.setContent(code);

    const { html, components } = await page.compile();

    for (let component of components) {
      asset.invalidateOnFileChange(component);
      // console.log(component);
      // asset.addURLDependency(component);
      // asset.addDependency({
      //   specifier: component,
      //   specifierType: 'commonjs'
      // });
    }

		asset.type = 'html';
		asset.setCode(html);

    return [asset];
  },
});
