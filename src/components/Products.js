import React from 'react';
import { Link, Route } from 'react-router-dom';
import Product from './Product';
import {connect} from 'react-redux';

import { bindActionCreators } from 'redux';
import { getProducts } from '../redux/actions';

class Products extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      status: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.addProduct = this.addProduct.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  render() {
  const match = this.props.match;
  const { productsData } = this.props.productState;
 
   /* Crea un arreglo de `<li>` por cada producto */
   const linkList = productsData.map(product => (
     <li key={product.id}>
       <Link to={`${match.url}/${product.id}`}>
         {product.name}
       </Link>
     </li>
   ));
 
   return (
     <div>
       <div>
         <div>
           <form>
              id<br/ >
             <input type="text" name="id" value={this.state.id} onChange={this.handleChange} />
             Nombre<br/ >
             <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
             Descripcion<br/ >
             <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
             Status<br/ >
             <input type="text" name="status" value={this.state.status} onChange={this.handleChange} /><br/ >
             <input type="button" value="Agregar" onClick={this.addProduct}/>
           </form>
         </div>
         <div>
           <button onClick={this.props.getProducts}>Traer Más</button>
         </div>
         <div>
           <h3> Products</h3>
           <ul> {linkList} </ul>
         </div>
       </div>
 
       <Route
         path={`${match.url}/:productId`}
         render={(props) => <Product data={productsData} {...props} />}
       />
       <Route
         exact
         path={match.url}
         render={() => (
           <div>Por favor seleccione un Producto.</div>
         )}
       />
     </div>
   );
  };
 };

 function mapStateToProps(state) {
   return {
    productState: state
   }
 }

 function mapDispatchToProps(dispatch){
   return bindActionCreators({ getProducts }, dispatch);
 }
 
 export default connect(mapStateToProps,mapDispatchToProps)(Products);