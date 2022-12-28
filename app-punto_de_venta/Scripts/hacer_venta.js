const filaTabla = [];
const itemsCompra = [];
var existencias;
var totalFinal=0;
var tipo;
var nota = 0;




var app2 = new Vue ({
    el: '#vue-content',
    data: function() {
        return {
            notas: [],
            key:"",
            nombre:"",
            maximo:"",
            cantidad: "",
            status: "",
            filaTabla:[],
            itemsCompra:[],
            existencias:"",
            totalFinal:0,
            tipo:"",
            //fechaSF: new Date(),
            //mes: fechaSF.getMonth()+1,
            //dia: fechaSF.getDate(),
            //fecha: fechaSF.getFullYear()+ '-' +(mes<10 ? '0' : '') + mes+'-' + +(dia<10 ? '0' : '') + dia,
            nota: 0
            
        }
    },
    mounted: async function(){
    console.log("Ok Vue 2");
    this.getNotas().then( res => {
    
    } );
    },
    methods: {
        getNotas: async function()
        {
            const res = await axios.get("http://localhost/PUNTO_DE_VENTA_CA/recuperar/");
            this.notas = res.data;
        },

        llenarArticulo: async function(){

          
            const sale = await axios.post("http://localhost/PUNTO_DE_VENTA_CA/llenar/",{ART_CVE_ARTICULO:this.key});
            this.cantidad = sale.data[0]["ART_PRECIO_VENTA"];
            this.nombre = sale.data[0]["ART_NOMBRE"];
            this.maximo = sale.data[0]["ART_CANTIDAD"];
           

        },
        registrarNota1: async function()
        {
           axios.put("http://localhost/PUNTO_DE_VENTA_CA/insertarNota/",
                    {
                        NOT_MONTO: totalFinal,
                        NOT_METODO: tipo,
                    }
            ). then(
               res => {

                i=0;
                lim = itemsCompra.length;
                while(i<lim)
                {
                    obj=itemsCompra[i].split("/");
                    cve_art=obj[0];
                    cve_nota=res.data;
                    cantidad=obj[2];
                    precio=obj[3];
    
                    axios.put("http://localhost/PUNTO_DE_VENTA_CA/insertar_art_nota/",
                        {
                            ART_CVE_ARTICULO: cve_art,
                            NOT_CVE_NOTA: cve_nota,
                            ARN_CANTIDAD: cantidad,
                            ART_PRECIO_VENTA: precio,
                        }
                ). then(res => { 
                    //alert("¡Tu registro ha sido completado exitosamente con el ID: "+resultado.data+"!");
                } );
                axios.put("http://localhost/PUNTO_DE_VENTA_CA/modificar_existencias/",
                        {
                            ART_CVE_ARTICULO: cve_art,
                            ART_CANTIDAD: cantidad,
                           
                        }
                ). then(res => { 
                        if(res.data == 1)
                        {
                        alert("producto actualizado");
                        }
                        else
                        {
                        alert("No se actualizó");
                        }
                } );
                
                    i++;
                }

                alert("¡Tu venta se ha registrado  exitosamente con el ID: "+res.data+"!");
                window.location.href = "ventas.php";
                      }
            );  
        },

    }
});
function agregarProducto()
{
   
    filaTabla[2] = $("#cantidadProducto").val();
    filaTabla[0] = $("#posiblesResultados").val();
    filaTabla[3] = $("#costo").val();
    filaTabla[1] = $("#nombre").val();
    filaTabla[4] = $("#maximo").val();
    existencias= $("#maximo").val();

    var rowCoincidencia = -1;
      
            if( (parseInt(filaTabla[2])<=existencias) )
            {
                rowCoincidencia = buscar_duplicados(filaTabla[0],filaTabla[3]);
                if(parseInt(rowCoincidencia)>-1)
                {
                actualizarProducto(rowCoincidencia,filaTabla[2]);
                }
                else
                 addProducto();
            }
            else
            {
                alert("Existencias del producto fuera del límite, solo hay: "+existencias+" existencias.");
                //alert("Algo falló: \ncp="+filaTabla[2]+"\n$"+filaTabla[3]+"\nex="+existencias+"\n"+filaTabla[2]+"<="+existencias+"?");
            }
    $("#subtotal").html("Subtotal: <br> $ "+calcularSubtotal()+"");
    $('#buscarProducto').val("");
    $('#cantidadProducto').val("1");
    return true;
};
function buscar_duplicados(id, costo)
{
    var nRow = -1;
    var rowFound = -1;
    var costoServ = -1;
    $('#CarritoDeCompras tbody tr').each(function() {
        nRow++;
        var customerId = $(this).find("td").eq(0).html();
        costoServ = $(this).find("td").eq(3).html();
        if(parseInt(customerId) == parseInt(id) && parseFloat(costo) == parseFloat(costoServ) )
        {
            rowFound = nRow;
            return rowFound;
        }
            
    });
    return rowFound;
};

function addProducto()
{
        $("#CarritoDeCompras>tbody").prepend('<tr class = "filaProducto">'+
        '<td scope="row">'+filaTabla[0]+'</td>'+
        '<td>'+ filaTabla[1]+'</td>'+
        '<td> <input type="number" class="inputsNum" min="1" size=5 max="'+existencias+'" value="'+filaTabla[2]+'"> </td>'+
        '<td> ' + document.getElementById("costo").value+'</td>'+
        '<td> <button type="button" class="quitar">X</button> </td>'+
        '</tr>");'+
        '<script>'+
            '$( ".inputsNum" ).change(function() {'+
                'if( parseInt($(this).val()) > parseInt($(this).attr("max")) )'+
                '{'+
                 ' var res = parseInt($(this).val())-parseInt($(this).attr("max"));'+
                  'alert("Inventario insuficiente, te excedes por: "+ res +" piezas. \\n Solo se agregará el stock máximo." );'+
                '$(this).val($(this).attr("max"));'+
                '}else if(parseInt($(this).val())<1){ alert("Error, no puedes llevar cantidades negativas de productos, se colocará 1 pieza");$(this).val("1")}'+
                ' $("#subtotal").html("Subtotal: <br> $ "+calcularSubtotal()+"");'+
                '});'+
        '</script>'
        );
};
$(function () {
    $(document).on('click', '.quitar', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
        $("#subtotal").html("Subtotal: <br> $ "+calcularSubtotal()+"");
    });
});
function calcularSubtotal()
{
    var subtotal = 0;
    $('#CarritoDeCompras tbody tr').each(function() {
        var cantidad = $(this).find("td").eq(2).find("input").val();
        var precio = $(this).find("td").eq(3).html();
        subtotal += ( parseInt(cantidad) * parseFloat(precio) );
    });
    return parseFloat(subtotal).toFixed(2);
};

function actualizarProducto(rowCoincidencia, cantidad)
{
    var nRow = -1;
    $('#CarritoDeCompras tbody tr').each(function() {
        nRow++;
        //var customerId = $(this).find("td").eq(2).html();
        var customerId = $(this).find("td").eq(2).find("input").val();
        var existencias = $(this).find("td").eq(2).find("input").attr("max");
        if(parseInt(nRow) == parseInt(rowCoincidencia))
        {
            var suma = parseInt(customerId)+parseInt(cantidad);
            if(existencias == "inf" || parseInt(existencias)>=suma)
                var customerId2 = $(this).find("td").eq(2).find("input").val(suma);
            else
                alert("Máximo disponible: "+existencias+" piezas.\n Te estás excediento por "+(parseInt(suma)-parseInt(existencias))+" piezas");
        }
    });
};
function cancelarCompra()
{
    window.location.href = "ventas.php";
};


//BOTON PARA COMPRAR 
function hacerCompra()
{

    if(obtenerFilas()=='')
        alert("Primero agregue productos al carrito");
    else
    {
        totalFinal=calcularSubtotal();
        $("#dineroRecibido").attr("min",totalFinal);
        $("#dineroRecibido").val(totalFinal);
        $("#ventasComponente1").addClass("disabledbutton");
        $("#ventasComponente2").addClass("disabledbutton");
        $("#ventasComponente3").addClass("disabledbutton");
        $("#ventaFinal").addClass("offset-md-3");
        $("#ventaFinal").html(
            '<div class ="px-lg-4 py-lg-2">'+
                '<h1 id="titular">Verifique la venta a realizar: </h1>'+
                '<TABLE class="table table-fixed"><colgroup span="2"></colgroup><thead class="thead-lightx">'+
                '<div class="form-control">'+
                '<label >Método de pago:</label>'+
                 '<select id="tipo" class="selected" >'+
                 '<option value=""  selected>Selecciona el método de pago</option>'+
                 '<option value="Efectivo">Efectivo</option>'+
                  '<option  value="Tarjeta">Tarjeta</option>'+
                  '</select>'+
                   '</div>'+
                '<tr><th> <input type="number" id="dineroRecibido" placeholder="Ingresa la cantidad recibida" min="'+totalFinal+'" value="'+totalFinal+'"step="10" pattern="^\d*(\.\d{0,2})?$"></thZ>'+
                '<th id="cambioLabel"> Cambio: $ 00.00 </th>'+
                '</thead></TABLE>'+
            '</div>'+
            '<div class="my-custom-scrollbar table-wrapper-scroll-y bg-white mx-auto rounded shadow" id="ventasComponente2">'+
                '<table id="carritoAComprar" class="table table-fixed">'+
                    '<thead class="thead-lightx">'+
                        '<tr>'+
                        '<th> ID Producto </th>'+
                        '<th> Nombre </th>'+
                        '<th> Cantidad </th>'+
                        '<th> Precio unitario </th>'+
                        '<th> Tipo </th>'+
                        '<th> Subtotal </th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                        obtenerFilas()+
                    '</tbody>'+
                    '</table>  '+
            '</div>'+
            '<div id="vue-content">'+
            '<div class="d-flex justify-content-around" id="ventasComponente3">'+
                '<button type="button" id="vender" class="btn btn-primary flex-grow-1  m-lg-2" onclick=" return vender();" disabled>Realizar Venta</button>'+
                '<label id="subtotalF"> '+$("#subtotal").html() +'</label>'+
        '</div>'+
        '<div id="paypal"></div>'+
           
        '</div>'
        );
        $('html, body').animate({

                scrollTop: $("#ventaFinal").offset().top

            }, 1500);
        //addItemsClientes();
        $("#dineroRecibido").focus();
        $("#dineroRecibido").select();
        $(document).ready(function(){
            $("#dineroRecibido").focusout(function(){
                var $total = parseFloat(totalFinal).toFixed(2);
                var $recibido = parseFloat($(this).val()).toFixed(2);
                if($recibido >= 0)
                {
                    if( parseFloat($recibido) >= parseFloat($total) )
                    {
                        $("#vender").focus();
                        $("#vender").prop("disabled",false);
                        $("#cambioLabel").html("Cambio: $ "+($recibido-$total).toFixed(2));
                        $("#resultadosA").html('<div id="resultadosA" class="col-lg-12"></div>');
                        $('html, body').animate({
            
                            scrollTop: $("#vender").offset().top
                    
                        }, 1800);
                        //alert($recibido +">="+ $total);
                    }
                    else
                    {
                        $("#cambioLabel").html("Cambio: $ 00.00");
                        $("#resultadosA").html(
                            '<center><div class="alert alert-danger alert-dismissable" id="resultadoVenta">'+
                            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                            '<strong>Error, faltan: $ '+($total-$recibido).toFixed(2)+'</strong><br>'+
                            //'<strong>'+$total+'----'+$recibido+'</strong>'+
                            '</div></center>'
                            );
                        $('html, body').animate({
            
                            scrollTop: $("#resultadoVenta").offset().top
                    
                        }, 1000);
                        $('html, body').animate({
            
                            scrollTop: $("#titular").offset().top
                    
                        }, 1800);
                        $("#dineroRecibido").focus();
                        $("#dineroRecibido").select();
                        $("#vender").prop("disabled",true);
                        
                    }
                }
                else
                {
                    $("#cambioLabel").html("Cambio: $ 00.00");
                    $("#resultadosA").html(
                        '<center><div class="alert alert-danger alert-dismissable" id="resultadoVenta">'+
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                        '<strong>No puede haber una entrada negativa, se consideraría robo</strong>'+
                        '</div></center>'
                        );
                    $('html, body').animate({
        
                        scrollTop: $("#resultadoVenta").offset().top
                
                    }, 1000);
                    $('html, body').animate({
        
                        scrollTop: $("#titular").offset().top
                
                    }, 1800);
                    $("#dineroRecibido").focus();
                    $("#dineroRecibido").select();
                    $("#vender").prop("disabled",true);
                    
                }
            });
        });
        $(document).on('keyup','#dineroRecibido', function(e) 
        {
            if(e.keyCode == 13)
            {
                $("#dineroRecibido").blur();
                if($("#vender").prop('disabled')==false)
                    $("#vender").focus();
                else
                {
                    $("#dineroRecibido").focus();
                    $("#dineroRecibido").select();
                }
            }
                
        });
    }
    pago(); 
}
function obtenerFilas()
{
    var itemsHtml='';
    $('#CarritoDeCompras tbody tr').each(function() {
        itemsHtml+='<tr class = "filaProducto">';
        itemsHtml+='<td scope="row">'+$(this).find("td").eq(0).html()+'</td>';
        itemsHtml+='<td>'+$(this).find("td").eq(1).html()+'</td>';
        itemsHtml+='<td>'+$(this).find("td").eq(2).find("input").val()+'</td>';
        itemsHtml+='<td>'+$(this).find("td").eq(3).html()+'</td>';
        itemsHtml+='<td>'+$(this).find("td").eq(4).html()+'</td>';
        var sub=parseInt($(this).find("td").eq(2).find("input").val())*parseFloat($(this).find("td").eq(3).html());
        itemsHtml+='<td>'+parseFloat(sub).toFixed(2)+'</td>';
        itemsHtml+='</tr>';
    });
    return itemsHtml;
};
function vender()
{
    totalFinal=calcularSubtotal();
    var itemData;
    var index=0;
    $('#carritoAComprar tbody tr').each(function() {
        itemData=$(this).find("td").eq(0).html()+'/';
        itemData+=$(this).find("td").eq(1).html()+'/';
        itemData+=$(this).find("td").eq(2).html()+'/';
        itemData+=$(this).find("td").eq(3).html()+'/';
        itemData+=$(this).find("td").eq(4).html()+'/';
        itemData+=$(this).find("td").eq(5).html();
        itemsCompra[index]=itemData;
        index=index+1;
    });
    
     registrar();
     
};
function registrar()
{
     tipo = $("#tipo").val();
    //obj=itemsCompra[0].split("/");

    app2.registrarNota1();
    //app2.registrarArt_Nota();
  
};
function pago()
{
    paypal.Buttons(
        {style:{
            color:'blue',
            shape:'pill',
            label: 'pay'
        },
        createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: this.totalFinal // Can also reference a variable or function
          }
        }]
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(function(orderData) {
        // Successful capture! For dev/demo purposes:
        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
        const transaction = orderData.purchase_units[0].payments.captures[0];
        
        valor=transaction.status;

        if(valor =="COMPLETED")
        {
            vender();
            alert("Transacción exitosa "+valor);
        }

        
        
      });
    },
    onCancel: function(data)
    {
        alert("Pago cancelado");
        console.log(data);
    }
        }).render('#paypal');

}
