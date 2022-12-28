var app = new Vue({
	el: '#vue-content',
	data: function() {
		return {
            notas: [], datos:[], reporte:[],
            key2: "",
            key:"",
            nombre:"",
            maximo:"",
            cantidad: "",
            status: "",
            insertar: true,
            row: {
                "ART_FECHA": "",
                "ART_NOMBRE": "",
                "ART_DESCRIPCION": "",
                "ART_CANTIDAD": "",
                "ART_PRECIO_COMPRA": "",
                "ART_PRECIO_VENTA": "",
                "ART_CATEGORIA": "",
            },

            row1: {
                "ART_CVE_ARTICULO": "",
                "ART_FECHA": "",
                "ART_NOMBRE": "",
                "ART_DESCRIPCION": "",
                "ART_CANTIDAD": "",
                "ART_PRECIO_COMPRA": "",
                "ART_PRECIO_VENTA": "",
                "ART_CATEGORIA": ""
            }
		}
	},
	mounted: async function(){
		console.log("Ok Vue");
        this.getNotas().then( res => {
            
            ///this.getDataSelected(); 
            //$("#idDisponibles").prop('selectedIndex',0);
            this.cargarVistaTabla();
            
            
           

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

        llenarArticulo1: async function()
        {
            console.log(this.row1);
            const sale1 = await axios.get("http://localhost/PUNTO_DE_VENTA_CA/llenar1/?id="+this.row1.ART_CVE_ARTICULO);
            console.log(sale1);
            this.row1.ART_FECHA = sale1.data[0]["ART_FECHA"];
            this.row1.ART_NOMBRE = sale1.data[0]["ART_NOMBRE"];
            this.row1.ART_DESCRIPCION = sale1.data[0]["ART_DESCRIPCION"];
            this.row1.ART_CANTIDAD = sale1.data[0]["ART_CANTIDAD"];
            this.row1.ART_PRECIO_COMPRA = sale1.data[0]["ART_PRECIO_COMPRA"];
            this.row1.ART_PRECIO_VENTA = sale1.data[0]["ART_PRECIO_VENTA"];
            this.row1.ART_CATEGORIA = sale1.data[0]["ART_CATEGORIA"];
        },

        cargarReporte: async function()
        {
                $('#tablaReporte').DataTable( {
                    data: this.reporte,
                    dom: 'Bfrtip',

                    columns: [
                        { data: 'not_cve_nota'},
                        { data: 'not_fecha' },
                        { data: 'art_nombre' },
                        { data: 'arn_cantidad' },
                        { data: 'art_precio_venta' },
                    ],
                    buttons: [
                    'excel', 'pdf', 'print'
                    ]
                } );
        
        },


        cargarVistaTabla: async function()
        {
         
            $('#tablaInventario').DataTable({
                data: this.notas,
                dom: 'Bfrtip',
                select: true,
            
                columns: [
                    { data: 'ART_CVE_ARTICULO'},
                    { data: 'ART_FECHA' },
                    { data: 'ART_NOMBRE' },
                    { data: 'ART_DESCRIPCION' },
                    { data: 'ART_CANTIDAD' },
                    { data: 'ART_PRECIO_COMPRA'},
                    { data: 'ART_PRECIO_VENTA' },
                    { data: 'ART_CATEGORIA' },
                ],
                  
                
            });
            
        },
        


        insertarInventario: function()
        {
           

            if(this.row1.ART_FECHA!="" && this.row1.ART_NOMBRE!="" && this.row1.ART_DESCRIPCION!="" && 
                this.row1.ART_CANTIDAD!="" && this.row1.ART_PRECIO_COMPRA!="" && this.row1.ART_PRECIO_VENTA!="" &&
                this.row1.ART_CATEGORIA!="")
            {
                
                
              axios.put("http://localhost/PUNTO_DE_VENTA_CA/registrar_articulo/",this.row1)
                .then(resultado =>{
                    alert("¡Tu registro ha sido completado exitosamente con el ID: "+resultado.data+"!");


                });
            
            }
            else
            {
                alert("Rellena todos los campos");
            }
        },

        actualizarInventario: function()
        {
        console.log("Se pasa por modificación");
        console.log(this.row1);
            if(this.row1.ART_CVE_ARTICULO!="" && this.row1.ART_FECHA!="" && this.row1.ART_NOMBRE!="" && this.row1.ART_DESCRIPCION!="" && 
                this.row1.ART_CANTIDAD!="" && this.row1.ART_PRECIO_COMPRA!="" && this.row1.ART_PRECIO_VENTA!="" &&
                this.row1.ART_CATEGORIA!="") 
            {
                
                axios.put("http://localhost/PUNTO_DE_VENTA_CA/actualizar_articulo/",
                this.row1)
                .then(resultado => {
                    alert("¡El producto ha sido modificado exitosamente!"+resultado.data);
                });
            
            }
            else
            {
                alert("Error: debe llenar todos los campos");
            }
        },


        cambiarValor: function(valor)
        {
           
            if(valor === 'Modificar'){
                this.insertar = false;
            }
            else if(valor === 'Agregar'){
                this.insertar = true;
            }
            
            
            
        },

        insertarOActualizar: function()
        {
            console.log("el valor es: "+this.insertar);
            if(this.insertar){
                this.insertarInventario();
            }
            else{
                this.actualizarInventario();
            }
        },



       
	}
});

