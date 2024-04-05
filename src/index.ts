import {useCallback, useState} from 'react';

type MetatadaObj<T> = {
    current: T|null,
    refHandler: (node: T|null) => void
};

/**
 * Hook for functional components
 */
function useRefsCollection<Value = any, Key = any>() {
    /**
     * Collection that stores all references
     */
    const [collection] = useState<Map<Key, MetatadaObj<Value>>>(
        () => new Map()
    );

    /**
     * Return reference handler for given key
     */
    const getRefHandler = useCallback((key: Key) => {
        if (!collection.has(key)) {
            const metadata: MetatadaObj<Value> = {
                current: null,
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
        }

        return collection.get(key)!.refHandler;
    }, [collection]);

    /**
     * Returns metadata by key
     */
    const getRef = useCallback((key: Key) => (
        collection.has(key) ? collection.get(key)!.current : undefined
    ), [collection]);

    /**
     * Returns key(s) that matches given value
     */
    const getKeysByRef = useCallback((valueToSearch: Value) => {
        const keys: Key[] = [];
        collection.forEach((metadata, key) => {
            if (metadata.current === valueToSearch) {
                keys.push(key);
            }
        });
        return keys;
    }, [collection]);

    /**
     * Returns single key that matches given value
     */
    const getKeyByRef = useCallback((valueToSearch: Value) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, metadata] of collection) {
            if (metadata.current === valueToSearch) {
                return key;
            }
        }
        return undefined;
    }, [collection]);

    return {
        getRefHandler,
        getRef,
        getKeysByRef,
        getKeyByRef
    };
}

export default useRefsCollection;
