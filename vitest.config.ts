import {defineConfig} from "vitest/config";

export default defineConfig({
    test: {
        include: ['test/**/*.test.cts','test/**/*.test.ts'],
        globals: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
            reportsDirectory: './coverage',
            exclude: [
                'cjs/',
                'esm/',
                'node_modules/',
                '**/*.test.js',
                '**/*.spec.js',
                '**/vitest.config.js'
            ]
        }
    }
})
