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
import EditCategoria from '../pages/EditCategoria';
import SubCategorias from '../pages/Subcategorias';
import NewSubCategoria from '../pages/NewSubCategoria';
import EditSubCategoria from '../pages/EditSubCategoria';
import SubProducto from '../pages/SubProducto';
import NewSubProducto from '../pages/NewSubProducto';
import EditSubProducto from '../pages/EditSubProducto'
import Tamaño from '../pages/Tamaño';
import NewTamaño from '../pages/NewTamaño';
import EditTamaño from '../pages/EditTamaño';
import Legales from '../pages/Legales';
import EditLegales from '../pages/EditLegales';

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

          <Route exact path="/subproductos" component={SubProducto} />
          <Route exact path="/subproducto/agregar" component={NewSubProducto} />
          <Route exact path="/subproducto/editar/:id" component={EditSubProducto} />

          <Route exact path="/productos" component={Products} />
          <Route exact path="/producto/agregar" component={NewProduct} />
          <Route exact path="/producto/editar/:productId" component={EditProduct} />

          <Route exact path="/categorias" component={Categorias} />
          <Route exact path="/categoria/agregar" component={NewCategoria} />
          <Route exact path="/categoria/editar/:id" component={EditCategoria} />

          <Route exact path="/subcategorias" component={SubCategorias} />
          <Route exact path="/subcategoria/agregar" component={NewSubCategoria} />
          <Route exact path="/subcategoria/editar/:id" component={EditSubCategoria} />

          <Route exact path="/marcas" component={Marcas} />
          <Route exact path="/marca/agregar" component={NewMarca} />
          <Route exact path="/marca/editar/:id" component={EditMarca} />

          <Route exact path="/tamaños" component={Tamaño} />
          <Route exact path="/tamaño/agregar" component={NewTamaño} />
          <Route exact path="/tamaño/editar/:id" component={EditTamaño} />

          <Route exact path="/legales" component={Legales} />
          <Route exact path="/legales/editar" component={EditLegales} />

          <Route exact path="/zonas-envio" component={Tamaño} />
          <Route exact path="/zonas-envio/editar/:id" component={NewTamaño} />
          <Route exact path="/zonas-envio/agregar" component={NewTamaño} />
          
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;