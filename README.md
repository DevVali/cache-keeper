[![GitHub release](https://img.shields.io/github/release/DevVali/cache-keeper.svg)](https://github.com/DevVali/cache-keeper/releases/latest)
[![npm](https://img.shields.io/npm/dt/cache-keeper.svg)](https://www.npmjs.com/package/cache-keeper)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/DevVali/cache-keeper?tab=MIT-1-ov-file#readme)

# Cache Keeper

A simple and lightweight caching solution for your Discord bot.

## Installation

To get started, install the library using npm (or your other favorite package manager):

```bash
npm install cache-keeper
```

## Usage

> <img align="top" src="https://upload.wikimedia.org/wikipedia/en/3/35/Information_icon.svg" alt="image" width="25" height="auto">&nbsp; The term TTL refers to Time to Live.

### Creating a cache instance

```js
// Create a cache instance with a default TTL of 10 minutes
const cache = new Keeper();

// Create a cache instance with a custom default TTL of 30 minutes
const longCache = new Keeper(1800000);
```

### Setting values

-   Use the `set` method to store a key-value pair in the cache
-   You can optionally specify a custom TTL for an entry that overrides the default

```js
cache.set('userId', '12345');

// Set with a custom TTL of 5 minutes
cache.set('username', 'AwesomeUser', 300000);
```

### Retrieving values

-   Use the `get` method to retrieve a value from the cache
-   You can optionally specify a default value to return if the entry is not set

```js
console.log(cache.get('userId')); // '12345'
console.log(cache.get('userNickname', 'DefaultNick')); // 'DefaultNick'
```

### Other useful methods

-   `has`: Checks if a key is cached
-   `delete`: Removes an entry from the cache
-   `clear`: Removes all entries from the cache
-   `size`: Returns the current number of entries in the cache

### Advanced usage

-   `getExpirationTime`: Returns the expiration time of an entry
-   `clearExpired`: Removes all expired entries from the cache

### TypeScript support

`cache-keeper` provides robust TypeScript support for type safety and code maintainability.

```ts
// Define a type for the cache key
type UserId = string;

// Define an interface for the cache value
interface UserData {
    username: string;
    userNickname: string;
    createdTimestamp: number;
}

// Create a cache instance using generic types for key and value types
const userCache = new Keeper<UserId, UserData>();

// Store user data in the cache
userCache.set('12345', {
    username: 'AwesomeUser',
    userNickname: 'DefaultNick',
    createdTimestamp: 1723320168561,
});

// Retrieve user data from the cache
if (userCache.has('12345')) {
    const userData = userCache.get('12345')!;
    console.log(userData.username); // TypeScript knows the shape of userData
}
```

## Resources

-   [`@discordjs/collection`](https://www.npmjs.com/package/@discordjs/collection) (Dependency)
-   [Repo template](https://github.com/bit-js/library)
-   [Discord bot template](https://github.com/devvali/djs-template)

## Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/DevVali/cache-keeper/issues).
