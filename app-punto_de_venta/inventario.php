<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.css">
    <link rel="stylesheet" href="./CSS/design.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://getbootstrap.com/docs/5.2/assets/css/docs.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
    <link rel="stylesheet" href="CCS/estilos.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.10"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.js"></script>
    <!--script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script-->
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    <!-- JAVASCRIPT -->
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.js"></script>

    <title>PUNTO DE VENTA INFORMES</title>
    </head>
    <body>

    <div id="vue-content">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">PUNTO DE VENTAS</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" href="./inventario.php">INVENTARIO</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="./reportes.php">REPORTES</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="./ventas.php">CARRO DE COMPRAS</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Div que contiene DataTable y botones de con funciones -->
        <div class="container">
            
                <center>
                    <br><h2>INVENTARIO</h2><br>
                    <br>

                    <table id="tablaInventario" class="display table table-striped" >
                        <thead>
                            <tr> 
                                <th>CLAVE ARTICULO</th>
                                <th>FECHA</th>
                                <th>NOMBRE</th>
                                <th>DESCRIPCION</th>
                                <th>CANTIDAD </th>
                                <th>PRECIO DE COMPRA</th>
                                <th>PRECIO VENTA</th>
                                <th>CATEGORIA</th>
                            </tr>
                        </thead>
                    </table>

                    <br>
                    <br>
                    <div class="row">
                        <div class="col-6 ml-5 mr-5">
                        </div>  
                        <div class="col-2 ml-5" >
                            <div class="text-center">
                                <button type="button" class="btn btn-primary w-100"
                                data-bs-toggle="modal" data-bs-target="#modalModificar"
                                v-on:click="cambiarValor('Agregar')">
                                <i class="bi bi-plus-circle-fill"> Agregar</i> 
                                </button>
                            </div>  
                        </div> 
                    
                        <div class="col-2">
                            <div class="text-center" >
                                <button type="button" class="btn btn-primary w-100"
                                data-bs-toggle="modal" data-bs-target="#modalModificar"
                                v-on:click="cambiarValor('Modificar')">
                                <i class="bi bi-plus-circle-fill"></i> Modificar
                                </button>
                            </div>  
                        </div>  
                    </div>
                </center>
        </div>


        <!-- Modal Modificar -->
        <div>
        <div class="modal fade" id="modalModificar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1  class="modal-title fs-5" id="exampleModalLabel">{{insertar == true ? 'Agregar' : 'Modificar'}} Producto</h1>

                                
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div class="modal-content">
                                <div >
                                    <div class="modal-body">
                                        <div v-if="insertar == false">

                                        <label>ID</label>
                                        <input v-on:blur="llenarArticulo1" type="number" v-model="row1.ART_CVE_ARTICULO" placeholder="Ingrese el ID del producto"  required  class="form-control">
                                        <br />    
                                        </div>
                                                        
                                        <label>Fecha y hora de registro</label>
                                        <input type="datetime-local"  v-model="row1.ART_FECHA"  class="form-control">
                                        <br />

                                        <label>Nombre del producto</label>
                                        <input type="text" v-model="row1.ART_NOMBRE" placeholder="Ingrese el nombre del producto"  required class="form-control">
                                        <br />

                                        <label>Descripción</label>
                                        <input type="text" v-model="row1.ART_DESCRIPCION" placeholder="Ingrese una descripción" required class="form-control">
                                        <br />

                                        <label>Cantidad</label>
                                        <input type="number" pattern="0-9" v-model="row1.ART_CANTIDAD" placeholder="Ingrese la cantidad"  required class="form-control">
                                        <br />

                                        <label>Precio de compra</label>
                                        <input type="number" pattern="0-9" v-model="row1.ART_PRECIO_COMPRA" placeholder="Ingrese el precio de compra" required class="form-control">
                                        <br />

                                        <label>Precio de venta</label>
                                        <input type="number" pattern="0-9" v-model="row1.ART_PRECIO_VENTA" placeholder="Ingrese el precio de venta"  required class="form-control">
                                        <br />

                                        <label>Categoría</label>
                                        <input type="text" placeholder="Ingrese una descripción" v-model="row1.ART_CATEGORIA" required class="form-control">
                                        <br />

                                        
                                    </div>
                                    
                                    <div class="modal-footer">
                                        <button  class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button class="btn btn-primary" v-on:click="insertarOActualizar">{{insertar == true ? 'Agregar' : 'Modificar'}}</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                </div>
        </div>
        </div>


        <!-- <div id="vue-content">
    <div class="row g-0">
        <div class="col-lg-5">
            <div class ="px-lg-4 py-lg-2">
                <h1>Elige productos:</h1>
            </div>
            <div class = "mx-auto contenedor rounded shadow" id="ventasComponente1">
            
                <div class="mb-3">
                <label>Artículos</label>
                <select id="posiblesResultados" v-model="key1" @change="llenarArticulo1()" class="form-control">
                    <option v-for="articulo in notas" :value="articulo.ART_CVE_ARTICULO">{{articulo.ART_CVE_ARTICULO}} - Nombre: {{articulo.ART_NOMBRE}}</option>
                </select>
                </div>
              
                <div class="mb-3">
                <label>Cantidad</label>
                <input type="number"  pattern="0-9" id="cantidadProducto" value="1" min="1" max="1" placeholder="Solo cantidades enteras mayores a 1" required class="form-control">
                <br />
                </div>
                <div class="mb-3">
                <label>Precio:</label>
                <input type="number" v-model="cantidad" id="costo"  disabled  class="form-control">
                <input id="nombre"v-model="nombre" name="nombre" type="hidden">
                <input id="maximo" v-model="maximo" name="maximo" type="hidden" >
                <br/>
                </div>
   
                <div>
                <button id="btnAgregar"  class="btn btn-success" onclick=actualizarInventario();>Agregar</button>
                </div>
          
        </div>
    </div> -->

    </div>

        <script src="./Scripts/script.js"></script>
    </body>
</html>


