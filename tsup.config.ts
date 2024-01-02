import {defineConfig} from "tsup";

export default defineConfig({
    splitting: false,
    sourcemap: true,
    treeshake: true,
    clean: true,
    dts: true,
    format: ["cjs", "esm"],
    minify: "terser",
    entry: ["src/index.ts"],
    plugins: [],
});
