import { Collection } from "@discordjs/collection";

type CacheKey = string | number;

interface CacheEntry<T> {
    value: T;
    expiresAt: number;
}

export class Keeper<T> {
    private cache: Collection<CacheKey, CacheEntry<T>>;
    private readonly defaultTtl: number;

    constructor(defaultTtl: number = 600000) {
        if (defaultTtl <= 0)
            throw new RangeError("Default TTL must be a positive number");
        this.cache = new Collection<CacheKey, CacheEntry<T>>();
        this.defaultTtl = defaultTtl;
    }

    set(key: CacheKey, value: T, ttl: number = this.defaultTtl): void {
        if (ttl <= 0) throw new RangeError("TTL must be a positive number");
        const expiresAt = Date.now() + ttl;
        this.cache.set(key, { value, expiresAt });
    }

    get(
        key: string | number,
        dataOnly: boolean = true,
        defaultValue: T | null = null
    ): T | CacheEntry<T> | null {
        if (!this.has(key)) return defaultValue;
        const entry = this.cache.get(key)!;
        return dataOnly ? entry.value : entry;
    }

    has(key: CacheKey): boolean {
        const entry = this.cache.get(key);
        if (!entry || Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }

    delete(key: CacheKey): void {
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
