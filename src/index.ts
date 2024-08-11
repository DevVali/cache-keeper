import { Collection } from '@discordjs/collection';

interface CacheEntry<V> {
    value: V;
    expiresAt: number;
}

export class Keeper<K, V> {
    private cache: Collection<K, CacheEntry<V>>;
    private readonly defaultTtl: number;

    constructor(defaultTtl: number = 600000) {
        if (defaultTtl <= 0)
            throw new RangeError('Default TTL must be a positive number');
        this.cache = new Collection<K, CacheEntry<V>>();
        this.defaultTtl = defaultTtl;
    }

    set(key: K, value: V, ttl: number = this.defaultTtl): void {
        if (ttl <= 0) throw new RangeError('TTL must be a positive number');
        const expiresAt = Date.now() + ttl;
        this.cache.set(key, { value, expiresAt });
    }

    get(
        key: K,
        dataOnly: boolean = true,
        defaultValue: V | null = null
    ): V | CacheEntry<V> | null {
        if (!this.has(key)) return defaultValue;
        const entry = this.cache.get(key)!;
        return dataOnly ? entry.value : entry;
    }

    has(key: K): boolean {
        const entry = this.cache.get(key);
        if (!entry || Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }

    delete(key: K): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    size(): number {
        return this.cache.size;
    }

    clearExpired(): void {
        this.cache = this.cache.filter((entry) => entry.expiresAt > Date.now());
    }
}
