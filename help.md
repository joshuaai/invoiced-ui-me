# Invoiced UI React Help

## App Structure
The `src` folder provides all the components that will be needed.

Inside the `src` folder, the `index.js` serves as the base file that connects the components to the DOM.

We will be using `purecss` by Yahoo. We can add this by simply placing the `link` in the `public/index.html` or installing it as an npm module by running:
```bash
npm install purecss --save
```
and importing it into the base of our project by add to the `src/index.js`:
```js
import 'purecss/build/pure.css'
```

### Nested Components
You can nest a constant inside a component so that you don't always have to do `class ... extends React`, as seen below:
```js
const Contact = () =>
    <div className='pure-u-1-3'>
        <h2>Joshua A I</h2>
        <P>joshuaai@me.com</P>
    </div>;

class Layout extends React.Component {
  render() {
    return (
      <div className="App">
        <div id='layout' className='pure-g'>
          <Contact />
          <Contact />
        </div> 
      </div>
    );
  }
}

export default Layout;
```

### Props
You can use props to pass data instead of manually repeating the nested component:
```js
const data = [
  { name: 'Joshua I', email: 'joshuaai@me.com' },
  { name: 'Manuel S', email: 'manuel@me.com' },
  { name: 'Agape V', email: 'agape@me.com' }
];
.
.
.
class Layout extends React.Component {
  render() {
    return (
      <div className='App'>
        <div id='layout' className='pure-g'>
          { data.map(info => 
            //<Contact name={info.name} email={info.email} />
            //Using a splat operator instead
            <Contact {...info} />  
          )}
        </div> 
      </div>
    );
  }
}
```
Name and email are the props for the `Contact` component.

### Cleaning up Components
We separate the `Contact` and `data` components into different files, but give each data point an `id` since the `data` set reuses the `Contact` component. 

To use one component multiple time like this, we add a key to it in the `render()` method, which in this case is `key={info.id}`.

### Working with Events
Add the a method as a component prop that prevents the default click behavior:
```js
addContact = (e) => {
  e.preventDefault();
}
```
Add the click event:
```js
render() {
  return (
    <div className='App'>
      <a href='#' className='pure-button' onClick={this.addContact}>Add Contact</a>
      .
      .
    </div>
  );
}
```

### Component State
We use a life cycle method. It will run just before the component mounts:
```js
componentWillMount() {
  this.setState({
    contacts: data
  });
} 
```

In the `render()` method, we now access the `data` from the state thus: `this.state.data.map()`.

Whenever you run `this.setState({})` in any other method, react will know that there is a change and it needs to update the view.

### Adding a Form
In React, form `input` tags use a `ref` to collect the data, which can be referenced as `this.refs.name.value`.

The form can be put in a jsx function:
```js
newContact = () => 
    <div className='pure-g'>
      <div className='pure-u-12-24'>
        <form className='pure-form' onSubmit={this.addContact}>
          <fieldset>
            <legend>New Contact</legend>
            <input ref='email' type='email' placeholder='example@example.com' />
            <input ref='name' type='text' placeholder='Name' />
            <button type='submit' className='pure-button pure-button-primary'>Add</button>
          </fieldset>
        </form>
      </div>
    </div>
``` 
And referenced inside the `render()` function:
```js
{this.newContact()}
```

The `refs` are accessed thus inside the `addContact()` method:
```js
this.setState({
  contacts: contacts.concat({ id: newId, name: this.refs.name.value, email: this.refs.email.value })
});
```

### React Router
Add the package:
```bash
npm install --save react-router-dom
```

In the `src/index.js` file to manage the routes, refactor thus:
```js
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Layout} />
        <Switch>
          <Route exact path='/contacts' component={Collection} />
          <Route path='/contacts/:contactId' component={Show} />
        </Switch>
      </Switch>
    </div>
  )
}

ReactDOM.render(
  <Router><Root /></Router>,  document.getElementById('root')
);
```

### State Management with MobX
Create a stores folder and the accompanying files:
```bash
mkdir src/stores

touch src/stores/index.js

touch src/stores/Contacts.js
```