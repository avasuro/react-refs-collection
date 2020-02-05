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
import {useRefsCollection} from 'react-refs-collection';

// Some functional component that renders multiple children and
// should be able to call imperative handlers on them:
const ItemsList = ({items}) => {
   const [getItemRefHandler, getItemRef] = useRefsCollection();

   const doSomeActionOnItem = useCallback(itemId => {
       getItemRef(itemId).doSomeAction();
   }, []);

   return (
        <div>
            {items.map(({id, ...restProps}) => (
                <Item
                    ref={getItemRefHandler(id)}
                    {...restProps}
                />
            ))}
        </div>
   )
}
```

### In class components:

```JSX
import {RefsCollection} from 'react-refs-collection';

// Some class component that renders multiple children and
// should be able to call imperative handlers on them:
class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this._refsCollection = new RefsCollection();
    }

    doSomeActionOnItem(itemId) {
        this._refsCollection.getItemRef(itemId).doSomeAction();
    }

    render() {
        return (
            <div>
                {this.props.items.map(({id, ...restProps}) => (
                    <Item
                        ref={this._refsCollection.getItemRefHandler(id)}
                        {...restProps}
                    />
                ))}
            </div>
        )
    }
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
import {useRefsCollection} from 'react-refs-collection';

const MyComponent = (items) => {
  const [getItemRefHandler, getItemRef] = useRefsCollection();
  
  const [searchValue, setSearchValue] = useState("");

  const onChange = useCallback(e => {
    setSearchValue(e.target.value);
  }, []);

  const searchItem = useCallback(() => {
    const match = items.find(item =>
      item.value.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    if (!match) return;
    const itemNode = getItemRef(match.id);
    if (itemNode) {
      itemNode.focus();
    }
  }, [getItemRef, searchValue]);

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
            ref={getItemRefHandler(item.id)}
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

## License  
  
  [MIT](LICENSE)