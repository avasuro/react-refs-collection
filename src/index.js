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
                if (!node) {
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
 * Refs collection
 * @class
 * @constructor
 */
function RefsCollection() {
    const collection = new Map();
    return {
        clear: collection.clear.bind(collection),
        getRefHandler: key => getOrCreateMetadataByKey(collection, key).refHandler,
        getCurrentRef: key => getOrCreateMetadataByKey(collection, key).current
    };
}


/**
 * Hook for functional components
 * @returns {((function(*=): Function)|(function(*=): (undefined|Node)))[]}
 */
function useRefsCollection() {
    const refsCollection = useRef();
    if (!refsCollection.current) {
        // Map should be a mapping object from some key to object with the following structure:
        // {
        //     refHandler: function,
        //     current: node
        // }
        refsCollection.current = new RefsCollection();
    }

    // Clear refs collection on component destroy:
    useEffect(() => () => refsCollection.current.clear(), []);

    return [refsCollection.current.getRefHandler, refsCollection.current.getCurrentRef];
}

export {
    RefsCollection,
    useRefsCollection
};
