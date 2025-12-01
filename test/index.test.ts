import {describe, expect, it} from 'vitest';

describe('src/index.ts', () => {
    it('should have proper re-exports', () => {
        expect(() => import('../src/index.js')).not.toThrow();
    });

    it('should export all members from demo module', async () => {
        const module = await import('../src/index.js');
        const demoModule = await import('../src/demo/index.js');

        Object.keys(demoModule).forEach(key => {
            expect(module).toHaveProperty(key);
            // @ts-ignore
            expect(module[key]).toBe(demoModule[key]);
        });
    });
});
