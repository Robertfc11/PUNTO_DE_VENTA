
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
    <script src="https://www.paypal.com/sdk/js?client-id=AWjceezH4QudT-IoNYJSrxg3ZXLLhXfORWr9It9NfAB9eoC_oDIEMTu6tlTLmmnx3K-LOZ09X0cSTBTF&currency=MXN"></script>
    <title>PUNTO DE VENTA INFORMES</title>
</head>


<body>

    <!-- Div que contiene todo, con id del elemento Vue -->
    <div id="vue-content">

        <!-- Barra de navegación -->
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

        <!-- Título de Sección-->
        <div class="container">
            <center>
                <br>
                <h2>REALIZA UNA VENTA</h2><br>
            </center>
        </div>

        <!-- Div que divide las columnas -->
        <div class="col-12">

            <!-- Div que contiene formulario -->
                <div class="row g-0 pr-5 pl-5 ml-5">
                    <div class="col-lg-5">
                        <div class ="px-lg-4 py-lg-2">
                            <h1>Elige productos:</h1>
                        </div>
                        <div class = "mx-auto contenedor rounded shadow" id="ventasComponente1">
                        
                            <div class="mb-3">
                                <label>Artículos</label>
                                <select id="posiblesResultados" v-model="key" @change="llenarArticulo()" class="form-control">
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
                                <button id="btnAgregar"  class="btn btn-success" onclick=agregarProducto();>Agregar</button>
                            </div>
                    </div>
                </div>


            <!-- Div que contiene DataTable -->
            <div class="col-lg-6 ml-5">
                
                <div class="px-lg-4 py-lg-2">
                    <h1>Productos en carrito:</h1>
                </div>

                <div class="my-custom-scrollbar table-wrapper-scroll-y bg-white mx-auto rounded shadow" id="ventasComponente2">
                    <table id="CarritoDeCompras" class="table table-fixed">
                        <thead class="thead-lightx">
                            <tr>
                                <th> ID Producto </th>
                                <th> Nombre </th>
                                <th> Cantidad </th>
                                <th> Precio unitario </th>
                                <th> Quitar</th>
                            </tr>
                        </thead>
                        <tbody>      
                        </tbody>
                    </table>  
                </div>

                <div class="d-flex justify-content-around" id="ventasComponente3">
                    <button type="button" id="hacerCompraYa" class="btn btn-primary flex-grow-0 m-lg-2" onclick=" return hacerCompra();">Continuar</button>
                    <button type="button" id="cancelarCompra" class="btn btn-primary flex-grow-0  m-lg-2" onclick=" return cancelarCompra();">Cancelar compra</button>             
                    <label id="subtotal"> Subtotal: <br> $ 00.00 </label> <br>
                </div>
            
            </div>

        </div>    
        <!-- <div class="col-lg-6" id="ventaFinal">
        
        </div> -->
    </div>
        <div class="checkout-btn"></div>

</body>
<script src="Scripts/hacer_venta.js"></script>
</html>