<div align="center">
  <p>  
    Zero-dependencies library for <a href="https://reactjs.org/">React</a>
    to store and access multiple references to child components.
    <br/>
    See <a href="#example-of-usage">Example of usage</a> section for an example when this library can be helpful.
  </p>
  <img alt="npm peer dependency version" src="https://img.shields.io/npm/dependency-version/react-refs-collection/peer/react">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/react-refs-collection">
  <img alt="GitHub" src="https://img.shields.io/github/license/avasuro/react-refs-collection">
</div>

## Install
```
npm install --save react-refs-collection
```  

## Quick start

### In functional components:
```JSX
import useRefsCollection from 'react-refs-collection';

// Some functional component that renders multiple children and
// should be able to call imperative handlers on them:
const ItemsList = ({items}) => {
   const {getRefHandler, getRef} = useRefsCollection();

   const doSomeActionOnItem = useCallback(itemId => {
       getRef(itemId).doSomeAction();
   }, []);

   return (
        <div>
            {items.map(({id, ...restProps}) => (
                <Item
                    ref={getRefHandler(id)}
                    {...restProps}
                />
            ))}
        </div>
   )
}
```

## Example of usage

For example we have the following UI:
1) Search input + submit button
2) List of some items

When user filled search input and submitted it -
we have to scroll list of items to first item that matches
given search criteria and focus this item.

Here is an implementation ([Live Demo](https://codesandbox.io/s/floral-tdd-jw89k)):

```JSX
import useRefsCollection from 'react-refs-collection';

const MyComponent = (items) => {
  const {getRefHandler, getRef} = useRefsCollection();
  
  const [searchValue, setSearchValue] = useState("");

  const onChange = useCallback(e => {
    setSearchValue(e.target.value);
  }, []);

  const searchItem = useCallback(() => {
    const match = items.find(item =>
      item.value.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    if (!match) return;
    const itemNode = getRef(match.id);
    if (itemNode) {
      itemNode.focus();
    }
  }, [getRef, searchValue]);

  // Search value when user pressed "Enter":
  const onInputKeyUp = useCallback(
    e => {
      if (e.keyCode === 13) {
        searchItem();
      }
    },
    [searchItem]
  );

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchValue}
          onChange={onChange}
          onKeyUp={onInputKeyUp}
        />
        <button onClick={searchItem}>Search</button>
      </div>
      <div>
        {items.map(item => (
          <div
            key={item.id}
            className="focusable"
            ref={getRefHandler(item.id)}
            tabIndex={-1}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}

const items = [
    {id: 1, content: 'One'},
    {id: 2, content: 'Two'},
    {id: 3, content: 'Three'},
    {id: 4, content: 'Four'},
    {id: 5, content: 'Five'},
    {id: 6, content: 'Six'},
    {id: 7, content: 'Seven'},
    {id: 8, content: 'Eight'},
    {id: 9, content: 'Nine'},
    {id: 10, content: 'Ten'}
]
ReactDOM.render(<MyComponent items={items} />, document.getElementById('app'));
```

## API

`useRefsCollection` hook returns the following:

| method             | description                                                                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| getRefHandler(key) | returns value that should be passed to "ref" property of some react component to store reference to this component in collection under given key |
| getRef(key)        | Returns reference by it's key                                                                                                                    |
| getKeysByRef(ref)  | Returns array of all keys that relates to given reference object (or empty array if there is no keys assigned to given reference object)         |
| getKeyByRef(ref)   | Same as *getKeysByRef*, but returns only first found key or undefined if there is no key found.                                                  |
    
## License  
  
  [MIT](LICENSE)
