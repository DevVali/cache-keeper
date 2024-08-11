# Cache Keeper

[![GitHub release](https://img.shields.io/github/release/DevVali/cache-keeper.svg)]()
[![npm](https://img.shields.io/npm/dt/cache-keeper.svg)](https://img.shields.io/npm/dt/cache-keeper.svg)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/DevVali/cache-keeper?tab=MIT-1-ov-file#readme)

A simple and lightweight caching solution for your Discord bot.

## Installation

To get started, install the library using npm (or your other favorite package manager):

```
npm install cache-keeper
```

## Usage

### Creating a cache instance

```js
// Create a cache with a default TTL of 10 minutes
const cache = new Keeper();

// Create a cache with a custom default TTL of 30 minutes
const longCache = new Keeper(1800000);
```

### Setting values

-   Use the `set` method to store a key-value pair in the cache
-   You can optionally specify a custom TTL for an entry that overrides the default

```js
cache.set("userId", 12345);

// Set with a custom TTL of 5 minutes
cache.set("username", "AwesomeUser", 300000);
```

### Retrieving values

-   Use the `get` method to retrieve the value from the cache
-   You can optionally
    1. Return the entire cache entry object
    2. Set a default value to return if the entry is null

```js
console.log(cache.get("userId")); // 12345
console.log(cache.get("username"), false); // { value: "AwesomeUser", expiresAt: 1723320168561 }
console.log(cache.get("userNickname", true, "banana")); // banana
```

### Other useful methods

-   `has`: Checks if a specific key exists in the cache
-   `delete`: Removes a key-value pair from the cache
-   `clear`: Removes all entries from the cache
-   `size`: Returns the current number of entries in the cache

### Advanced usage

-   `clearExpired`: Removes all expired entries from the cache

## Resources

-   [`@discordjs/collection`](https://www.npmjs.com/package/@discordjs/collection) (Dependency)
-   [Repo template](https://github.com/bit-js/library)
-   [Discord bot template](https://github.com/devvali/djs-template)

## Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/DevVali/cache-keeper/issues).
