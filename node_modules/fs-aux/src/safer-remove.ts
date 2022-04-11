import { rm } from 'fs/promises';
import { join, resolve } from 'path';
import { pathExists } from './path-exists.js';

/** 
 * Remove one or more files if they are blow the current pwd or the give `cwd`.
 * 
 * @return Resolved the number of names removed
 **/
export async function saferRemove(names: string | string[], cwd?: string): Promise<string[]> {
  const baseDir = (cwd) ? resolve(cwd) : resolve(join('./'));
  let removedNames: string[] = [];
  names = (names instanceof Array) ? names : [names];

  for (const name of names) {
    const fullPath = join(baseDir, name);
    if (!fullPath.startsWith(baseDir)) {
      throw new Error(`FS-AUX-GUARD - Path to be removed does not look safe (nothing done): ${fullPath}\n\tCause: Does not belong to ${baseDir}`);
    }
    const exists = await pathExists(fullPath);
    if (exists) {
      await rm(fullPath, { recursive: true, force: true });
      removedNames.push(name);
    }
  }
  return removedNames;
}