import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Products from './components/Products';
import Category from './components/Category';


/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

/* App component */
const App = () => (
  <div>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/category'>Category</Link></li>
        <li><Link to='/products'>Products</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/category" component={Category} />
      <Route path="/products" component={Products} />
      <Route 
        path="/:id" 
        render={() => (
          <p>
            Quiero que este texto aparezca para todas las rutas excepto '/', '/products' y '/category'
          </p>
        )} 
      />
    </Switch>
  </div>
);

export default App;