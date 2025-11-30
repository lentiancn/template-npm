/*
 * MIT License
 *
 * Copyright (c) 2025 田隆 (Len)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import fs from 'fs';
import path from 'path';

(function renameToCommonJS(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            renameToCommonJS(fullPath);
        } else if (file.endsWith('.js')) {
            replaceJsToCjs(fullPath)
            replaceTsToCts(fullPath)

            const newPath = fullPath.replace(/\.js$/, '.cjs');
            fs.renameSync(fullPath, newPath);
        } else if (file.endsWith('.ts')) {
            replaceJsToCjs(fullPath)
            replaceTsToCts(fullPath)

            const newPath = fullPath.replace(/\.ts$/, '.cts');
            fs.renameSync(fullPath, newPath);
        }
    });
})('./cjs')

function replaceJsToCjs(fullPath) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const updatedContent = content
        .replace(/(\.\/[^'"]+)\.js(['"])/g, '$1.cjs$2')
        .replace(/(['"])\.\/([^'"]+)\.js(['"])/g, '$1./$2.cjs$3');
    fs.writeFileSync(fullPath, updatedContent);
}

function replaceTsToCts(fullPath) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const updatedContent = content
        .replace(/(\.\/[^'"]+)\.ts(['"])/g, '$1.cts$2')
        .replace(/(['"])\.\/([^'"]+)\.ts(['"])/g, '$1./$2.cts$3');
    fs.writeFileSync(fullPath, updatedContent);
}
