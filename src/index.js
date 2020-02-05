import {useRef, useEffect} from 'react';

/**
 * Helper method to create new metadata object in collection,
 * or return existing if it is present
 *
 * @param {Map} collection
 * @param {*} key
 * @returns {{current: (undefined|Node), refHandler: function}}
 */
function getOrCreateMetadataByKey(collection, key) {
    if (!collection.has(key)) {
        const metadata = {
            current: undefined,
            refHandler(node) {
                if (node === undefined || node === null) {
                    collection.delete(key);
                }
                else {
                    metadata.current = node;
                }
            }
        };
        collection.set(key, metadata);
        return metadata;
    }

    return collection.get(key);
}

/**
 * Returns metadata by key
 * @param {Map} collection
 * @param {*} key
 * @returns {*}
 */
function getRefByKey(collection, key) {
    return collection.has(key) ? collection.get(key).current : undefined;
}

/**
 * Returns key(s) that matches given value
 * @param {Map} collection
 * @param {*} valueToSearch
 * @returns {Array<*>}
 */
function getKeysByRef(collection, valueToSearch) {
    const keys = [];
    collection.forEach((value, key) => {
        if (value === valueToSearch) {
            keys.push(key);
        }
    });
    return keys;
}

/**
 * Returns single key that matches given value
 * @param {Map} collection
 * @param {*} valueToSearch
 * @returns {*|undefined} - return undefined
 */
function getKeyByRef(collection, valueToSearch) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of collection) {
        if (value === valueToSearch) {
            return key;
        }
    }
    return undefined;
}

/**
 * Refs collection
 * @class
 * @constructor
 */
function RefsCollection() {
    const collection = new Map();
    return {
        clear: collection.clear.bind(collection),
        getRefHandler: key => getOrCreateMetadataByKey(collection, key).refHandler,
        getRef: key => getRefByKey(collection, key),
        getKeysByRef: ref => getKeysByRef(collection, ref),
        getKeyByRef: ref => getKeyByRef(collection, ref)
    };
}


/**
 * Hook for functional components
 * @returns {((function(*=): Function)|(function(*=): (undefined|Node)))[]}
 */
function useRefsCollection() {
    const refsCollection = useRef();
    if (!refsCollection.current) {
        refsCollection.current = new RefsCollection();
    }

    // Clear refs collection on component destroy:
    useEffect(() => () => refsCollection.current.clear(), []);

    return refsCollection.current;
}

export {
    RefsCollection,
    useRefsCollection
};
