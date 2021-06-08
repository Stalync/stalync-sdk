let internalKVStore = global.kvStore;

if(!internalKVStore) {
    throw new Error("KVStore internal undefined, probably the code not running in the stalync server or stalync is down.");
}

class Value {
    /**
     * @param {string} v
     */
    constructor(v) {
        this.v = v;
    }

    /**
     * @param {boolean} toInteger
     * @returns {number}
     */
    toNumber(toInteger = false) {
        if(toInteger) return Number.parseInt(this.v);        
        return Number.parseFloat(this.v);
    }

    /**
     * @returns {string}
     */
    toString() {
        return `${this.v}`;
    }

    /**
     * @returns {boolean}
     */
    toBoolean() {
        return this.v == "true"  ? true :
               this.v == "false" ? false : null;
    }

    /**
     * @returns {boolean}
     */
    isNull() {
        if(this.v) return true;
        return false;
    }
}

/**
 * StalyncKV access stalync internal for storing basic data type
 * eg: number, string, boolean. For now list and object not supported.
 * if you want to use list, use number in the end of string instead 
 * to specify index of the list eg: `player_0`.
 */
class StalyncKV {
    /**
     * Put your stalync credentials for specific application
     * the credentials located in stalync profile page.
     * @param {string} developerID
     * @param {string} applicationName
     */
    constructor(developerID, applicationName) {
        this.developerID = developerID;
        this.applicationName = applicationName;
    }

    /** 
     * @param {string} key 
     * @returns {Promise<Value>}
     */
    async get(key) {
        let value = await internalKVStore.get(this.developerID, this.applicationName, key);
        return new Value(value);
    }

    /**
     * @param {string} key
     * @param {string | number | boolean} value
     */
    async set(key, value) {
        await internalKVStore.set(this.developerID, this.applicationName, key, value);
    }

    /** 
     * @param {string} key 
     */
    async delete(key) {
        await internalKVStore.delete(this.developerID, this.applicationName, key);
    }
}

module.exports = {
    StalyncKV,
};