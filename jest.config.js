module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            compiler: 'ttypescript',
        },
    },
    setupFiles: ['./test/setup.js'],
    roots: ['./test', './src'],
    collectCoverageFrom: [
        "src/**/{!(index|dummyData),}.ts"
    ],
    testEnvironment: "node",
    collectCoverage: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'js'],
    coverageDirectory: "./coverage",
    coverageReporters: [
        "text",
        "cobertura"
    ],
    coverageThreshold: {
        global: {
            lines: 0,
            statements: 0
        }
    }
}
