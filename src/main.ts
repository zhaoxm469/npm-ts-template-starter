type cacheDataType = {
    [cacheKeyName: string]: string;
};

export default class AppCache {
    prefix: string;

    data: cacheDataType = {};

    constructor(prefix: string = 'app') {
        this.prefix = prefix;
        this.init();
    }

    init(): void {
        const data = localStorage.getItem(this.prefix);
        if (data) this.data = JSON.parse(data);
    }

    get(cacheKeyName: string): boolean | object {
        const keyName = this.setCacheKeyName(cacheKeyName);
        if (this.data[keyName]) return JSON.parse(this.data[keyName]);
        return false;
    }

    getAll(): boolean | object {
        if (localStorage.getItem(this.prefix)) {
            return JSON.parse(localStorage.getItem(this.prefix) as string);
        }
        return false;
    }

    save(cacheKeyName: string, value: object | string | number): void {
        const keyName = this.setCacheKeyName(cacheKeyName);
        this.data[keyName] = JSON.stringify(value);
        localStorage.setItem(this.prefix, JSON.stringify(this.data));
    }

    setCacheKeyName(cacheKeyName: string): string {
        return `${this.prefix}-${cacheKeyName}`;
    }

    clear(cacheKeyName: string): boolean {
        const keyName = this.setCacheKeyName(cacheKeyName);
        if (this.data[keyName]) {
            delete this.data[keyName];
            localStorage.setItem(this.prefix, JSON.stringify(this.data));
            return true;
        }

        return false;
    }

    clearAll(): void {
        this.data = {};
        localStorage.removeItem(this.prefix);
    }
}
