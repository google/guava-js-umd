# GuavaJS-UMD

GuavaJS-UMD is a fork of [GuavaJS](https://github.com/nerdynick/guava-js) that was created for [postcss-rename](https://github.com/google/postcss-rename) to use in place of GuavaJS.

This is because GuavaJS 1.1.1, the current version at time of writing, isn't available on npm, and GuavaJS 1.1.1 isn't designed for a CommonJS environment.

Wrapping GuavaJS as a [UMD module](https://github.com/umdjs/umd) was chosen as the approach to resolve the latter problem.

You are welcome to use GuavaJS-UMD should you find it useful, but please be aware this fork doesn't intend to accept new features nor fix bugs in the GuavaJS library. (It would be in scope to patch upstream changes, however.)

## Disclaimer

This is not an officially supported Google product.
