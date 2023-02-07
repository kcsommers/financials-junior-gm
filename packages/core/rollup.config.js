import { nodeResolve } from '@rollup/plugin-node-resolve';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import svgr from '@svgr/rollup';

const input = [
  './src/index.ts',
  './src/components/LoadingSpinner/index.ts',
  './src/components/Button/index.ts',
];

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'react/jsx-runtime',
];

const plugins = [
  svgr(),
  nodeResolve({
    browser: true,
    extensions: ['.ts', '.tsx'],
  }),
  typescript({
    tsconfig: './tsconfig.build.json',
    typescript: require('typescript'),
  }),
  postcss({
    extract: false,
    modules: true,
    autoModules: true,
    use: ['sass'],
    plugins: [autoprefixer()],
  }),
];

const rollupConfig = [
  {
    input,
    output: {
      dir: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      dir: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
    external,
  },
];

export default rollupConfig;
