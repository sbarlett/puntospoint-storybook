const path = require('path');
module.exports = {
    components: './src/index.tsx',
    outputPath: './storybook-static/playroom',
    typeScriptFiles: ['./src/**/*.{ts,tsx}', '!**/node_modules'],
    title: 'Puntospoint ui',
    widths: [320, 768, 1024],
    openBrowser: false,
    frameComponent: './playroom/FrameComponent.js',
    paramType: 'search',
    baseUrl: '/playroom/',
    webpackConfig: () => ({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: __dirname,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    include: [path.resolve(__dirname, './playroom')],
                    use: [require.resolve('style-loader'), require.resolve('css-loader')],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
        },
    }),
    iframeSandbox: 'allow-scripts',
};
