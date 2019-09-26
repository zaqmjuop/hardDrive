const presets = [
  [
    '@babel/env',
    '@babel/preset-react',
    '@babel/preset-flow',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
    },
  ],
];

const plugins = [
  '@babel/plugin-transform-async-to-generator',
  '@babel/plugin-proposal-async-generator-functions',
  '@babel/plugin-proposal-class-properties',
];

module.exports = { presets, plugins };
