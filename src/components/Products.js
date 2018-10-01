import React from 'react';
import { Link, Route } from 'react-router-dom';
import Product from './Product';
import {connect} from 'react-redux';

import { bindActionCreators } from 'redux';
import { getProducts } from '../redux/actions';

const Products = (props) => {
  const match = props.match;
  const { productsData } = props.productState;
 
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
           <button onClick={props.getProducts}>Traer Más</button>
         </div>
         <div>
           <h3> Products</h3>
           <ul> {linkList} </ul>
         </div>
       </div>
 
       <Route
         path={`${match.url}/:productId`}
         render={props => <Product data={productsData} {...props} />}
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

 function mapStateToProps(state) {
   return {
    productState: state
   }
 }

 function mapDispatchToProps(dispatch){
   return bindActionCreators({ getProducts }, dispatch);
 }
 
 export default connect(mapStateToProps,mapDispatchToProps)(Products);