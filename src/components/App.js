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
import Banners from '../pages/Banners/Banners';
import NewBanner from '../pages/Banners/NewBanner';
import EditBanner from '../pages/Banners/EditBanner';
import UsuarioOferta from '../pages/UsuarioOfertas';
import NuevaNovedad from '../pages/UsuarioOfertas/nueva-novedad';

// import BadgeNew from '../pages/BadgeNew';
// import NotFound from '../pages/NotFound';

import UsuarioState from '../context/usuario/usuarioState';
import BalanceState from '../context/balance/balanceState';
import VentasState from '../context/ventas/ventasState';
import MediosState from '../context/mediosPago/mediosState';
import MarcasState from '../context/marcas/marcasState';

import RutaPrivada from './RutaPrivada';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Ofertas from '../pages/Ofertas';
import OfertasState from '../context/ofertas/ofertasState';
import NuevaOferta from '../pages/Ofertas/add';
import EditarOferta from '../pages/Ofertas/edit';

function App() {
  return (
    <BrowserRouter>
      <UsuarioState>
        <BalanceState>
          <VentasState>
            <MediosState>
              <MarcasState>
                <OfertasState>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Layout>
                      <Switch>
                        <RutaPrivada exact path="/" component={Home} />
                        <Route exact path="/ingresar" component={Login} />
                        {/*}<Route exact path="/imagen/:productId" component={imageForm} />{*/}

                        <RutaPrivada exact path="/subproductos" component={SubProducto} />
                        <RutaPrivada exact path="/subproducto/agregar" component={NewSubProducto} />
                        <RutaPrivada exact path="/subproducto/editar/:id" component={EditSubProducto} />

                        <RutaPrivada exact path="/productos" component={Products} />
                        <RutaPrivada exact path="/producto/agregar" component={NewProduct} />
                        <RutaPrivada exact path="/producto/editar/:productId" component={EditProduct} />

                        <RutaPrivada exact path="/categorias" component={Categorias} />
                        <RutaPrivada exact path="/categoria/agregar" component={NewCategoria} />
                        <RutaPrivada exact path="/categoria/editar/:id" component={EditCategoria} />

                        <RutaPrivada exact path="/subcategorias" component={SubCategorias} />
                        <RutaPrivada exact path="/subcategoria/agregar" component={NewSubCategoria} />
                        <RutaPrivada exact path="/subcategoria/editar/:id" component={EditSubCategoria} />

                        <RutaPrivada exact path="/marcas" component={Marcas} />
                        <RutaPrivada exact path="/marca/agregar" component={NewMarca} />
                        <RutaPrivada exact path="/marca/editar/:id" component={EditMarca} />

                        <RutaPrivada exact path="/tamaños" component={Tamaño} />
                        <RutaPrivada exact path="/tamaño/agregar" component={NewTamaño} />
                        <RutaPrivada exact path="/tamaño/editar/:id" component={EditTamaño} />

                        <RutaPrivada exact path="/legales" component={Legales} />
                        <RutaPrivada exact path="/legales/editar" component={EditLegales} />

                        <RutaPrivada exact path="/zonas-envio" component={Zonas} />
                        <RutaPrivada exact path="/zonas-envio/editar/:id" component={EditZona} />
                        <RutaPrivada exact path="/zonas-envio/agregar" component={NewZona} />
                        
                        <RutaPrivada exact path="/envios" component={Envios} />
                        <RutaPrivada exact path="/envios/editar/:id" component={Envios} />
                        <RutaPrivada exact path="/envios/agregar" component={Envios} />

                        <RutaPrivada exact path="/banners" component={Banners} />
                        <RutaPrivada exact path="/banners/editar/:id" component={EditBanner} />
                        <RutaPrivada exact path="/banners/agregar" component={NewBanner} />
                        
                        <RutaPrivada exact path="/medios-de-pago" component={MediosDePago}/>

                        <RutaPrivada exact path="/usuarios-ofertas" component={UsuarioOferta}/>
                        <RutaPrivada exact path="/nueva-novedad" component={NuevaNovedad}/>

                        <RutaPrivada exact path="/ofertas" component={Ofertas}/>
                        <RutaPrivada exact path="/ofertas/agregar" component={NuevaOferta}/>
                        <RutaPrivada exact path="/ofertas/editar/:id" component={EditarOferta}/>
                        {/* <Route component={NotFound} /> */}
                      </Switch>
                    </Layout>
                  </MuiPickersUtilsProvider>
                </OfertasState>
              </MarcasState>
            </MediosState>
          </VentasState>
        </BalanceState>
      </UsuarioState>
    </BrowserRouter>
  );
}

export default App;