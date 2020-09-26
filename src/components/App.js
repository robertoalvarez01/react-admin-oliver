import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Products from '../pages/Products';
import Marcas from '../pages/Marcas'
import NewProduct from '../pages/NewProduct';
import Categorias from '../pages/Categorias';
import NewCategoria from '../pages/NewCategoria';
import NewMarca from '../pages/NewMarca';
import Probe from '../components/Probe';
import ViewProduct from '../pages/ViewProduct';
import EditProduct from '../pages/EditProduct';
import EditMarca from '../pages/EditMarca';


// import BadgeNew from '../pages/BadgeNew';
// import NotFound from '../pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/ingresar" component={Login} />
          <Route exact path="/prueba" component={Probe} /> {/* Retirar esta linea despues... */}
          {/*}<Route exact path="/imagen/:productId" component={imageForm} />{*/}
          <Route exact path="/describirProducto/:productId" component={ViewProduct} />
          <Route exact path="/editarProducto/:productId" component={EditProduct} />
          <Route exact path="/producto/agregar" component={NewProduct} />
          <Route exact path="/productos" component={Products} />
          <Route exact path="/categorias" component={Categorias} />
          <Route exact path="/marcas" component={Marcas} />
          <Route exact path="/categoria/agregar" component={NewCategoria} />
          <Route exact path="/marca/agregar" component={NewMarca} />
          <Route exact path="/marca/editar/:id" component={EditMarca} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;