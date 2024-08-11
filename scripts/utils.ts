import { $, file, write } from "bun";
import { join } from "path";

export const cpToLib = (path: string) => write(join("./lib", path), file(path));
export const exec: (...args: Parameters<typeof $>) => Promise<any> = (
    ...args
) => $(...args).catch((err) => process.stderr.write(err.stderr));
