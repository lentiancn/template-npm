import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
// @ts-ignore
import {sayHello} from '../src/index.ts';

describe('sayHello', () => {
    let consoleSpy: any;

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {
        });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it('should log the correct message to the console', () => {
        sayHello();

        expect(consoleSpy).toHaveBeenCalledWith('Hello world, This is my demo');
    });
});
