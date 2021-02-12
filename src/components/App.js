import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Products from '../pages/Producto/Products';
import Marcas from '../pages/Marca/Marcas'
import NewProduct from '../pages/Producto/NewProduct';
import Categorias from '../pages/Categorias/Categorias';
import NewCategoria from '../pages/Categorias/NewCategoria';
import NewMarca from '../pages/Marca/NewMarca';
import EditProduct from '../pages/Producto/EditProduct';
import EditMarca from '../pages/Marca/EditMarca';
import EditCategoria from '../pages/Categorias/EditCategoria';
import SubCategorias from '../pages/SubCategoria/Subcategorias';
import NewSubCategoria from '../pages/SubCategoria/NewSubCategoria';
import EditSubCategoria from '../pages/SubCategoria/EditSubCategoria';
import SubProducto from '../pages/SubProducto/SubProducto';
import NewSubProducto from '../pages/SubProducto/NewSubProducto';
import EditSubProducto from '../pages/SubProducto/EditSubProducto'
import Tamaño from '../pages/Tamaño/Tamaño';
import NewTamaño from '../pages/Tamaño/NewTamaño';
import EditTamaño from '../pages/Tamaño/EditTamaño';
import Legales from '../pages/Legales/Legales';
import EditLegales from '../pages/Legales/EditLegales';
import Zonas from '../pages/Zona/Zonas';
import NewZona from '../pages/Zona/NewZona';
import EditZona from '../pages/Zona/EditZona'
import Envios from '../pages/Envio/envios';
import MediosDePago from '../pages/MedioDePago';

// import BadgeNew from '../pages/BadgeNew';
// import NotFound from '../pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/ingresar" component={Login} />
          {/*}<Route exact path="/imagen/:productId" component={imageForm} />{*/}

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

          <Route exact path="/zonas-envio" component={Zonas} />
          <Route exact path="/zonas-envio/editar/:id" component={EditZona} />
          <Route exact path="/zonas-envio/agregar" component={NewZona} />
          
          <Route exact path="/envios" component={Envios} />
          <Route exact path="/envios/editar/:id" component={Envios} />
          <Route exact path="/envios/agregar" component={Envios} />
          
          <Route exact path="/medios-de-pago" component={MediosDePago}/>
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;