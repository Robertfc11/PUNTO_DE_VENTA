var app = new Vue({
	el: '#vue-content1',
	data: function() {
		return {
            notas:[], 
            datos:[],
            nota:"",
            row: {
                "ART_FECHA": "",
                "ART_NOMBRE": "",
                "ART_DESCRIPCION": "",
                "ART_CANTIDAD": "",
                "ART_PRECIO_COMPRA": "",
                "ART_PRECIO_VENTA": "",
                "ART_CATEGORIA": "",
            },
        }

    },
    mounted: async function(){
		console.log("Ok Vue");
        this.getReporte().then( res =>
            {
            this.cargarReporte();
            });
    },
    methods: {
        getReporte: async function()
        {
            const res =  await axios.get("http://localhost/PUNTO_DE_VENTA_CA/reporte/");
            this.notas = res.data;
                
        },
        cargarReporte: async function()
        {
                $('#tablaReporte').DataTable( {
                    data: this.notas,
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
    }
});