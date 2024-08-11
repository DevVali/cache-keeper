import * as esbuild from "esbuild";
import { existsSync, rmSync } from "fs";
import { exec } from "./utils";

const outdir = "./lib";
if (existsSync(outdir)) rmSync(outdir, { recursive: true });

exec`bun x tsc`;

const buildOptions: esbuild.BuildOptions = {
    entryPoints: ["./src/**/*.ts"],
    outdir: outdir,
    platform: "node",
    minifyWhitespace: true,
    treeShaking: true,
};

await esbuild.build({
    ...buildOptions,
    format: "esm",
});

await esbuild.build({
    ...buildOptions,
    format: "cjs",
    outExtension: { ".js": ".cjs" },
});
