module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
        '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    coveragePathIgnorePatterns: ['/node_modules/', '.+\\.(css|styl|less|sass|scss)$'],

    // https://github.com/zeit/next.js/issues/8663#issue-490553899
    globals: {
        // we must specify a custom tsconfig for tests because we need the typescript transform
        // to transform jsx into js rather than leaving it jsx such as the next build requires. you
        // can see this setting in tsconfig.jest.json -> "jsx": "react"
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.jest.json',
        },
    },
    testResultsProcessor: 'jest-sonar-reporter',
};
