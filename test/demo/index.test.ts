import {describe, expect, it, vi} from 'vitest';
// @ts-ignore
import {aFunction} from '../../src/index.ts';

describe('aFunction', () => {
    it('should log the correct message to console', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {
        });

        aFunction();

        expect(consoleSpy).toHaveBeenCalledWith('Hello world! This is the demo for a function');

        consoleSpy.mockRestore();
    });
});
