<?php



    $router->map( 'GET', 'ejercicio5/', function(){
        echo "PUNTO DE VENTA conectado a la bd";
    });

$router ->map('GET','recuperar/',function(){
   
    global $database;
    $res = $database ->select('articulo',"*");
    echo json_encode($res);
    });



    $router->map('PUT', 'registrar_articulo/', function(){

        
        global $database;
        $json = file_get_contents("php://input");
        $data= json_decode($json);


         $database -> insert("articulo", 
        [
            "ART_FECHA" => $data->ART_FECHA,
            "ART_NOMBRE" =>$data->ART_NOMBRE,
            "ART_DESCRIPCION" => $data->ART_DESCRIPCION,
            "ART_CANTIDAD" =>$data->ART_CANTIDAD,
            "ART_PRECIO_COMPRA" => $data->ART_PRECIO_COMPRA,
            "ART_PRECIO_VENTA" => $data->ART_PRECIO_VENTA,
            "ART_CATEGORIA" => $data->ART_CATEGORIA
        ]);
        
                echo $database -> id();
               

        });


        $router->map('POST', 'llenar/', function () {

            global $database;
            $json = file_get_contents("php://input");
            $data = json_decode($json);
        
            $id=$data->ART_CVE_ARTICULO;
        
            $columns = ["ART_CVE_ARTICULO","ART_NOMBRE","ART_PRECIO_VENTA","ART_CANTIDAD"];
        
            $where=["ART_CVE_ARTICULO"=> $id];
        
            $data = $database->select('articulo', $columns, $where);
            echo json_encode($data);
        });

        $router->map('PUT', 'insertarNota/', function(){
            date_default_timezone_set('America/Mexico_City');
            $fecha = date("Y")."-".date("m")."-".date("d");
            $hora = date("H").":".date("i").":".date("s");
        
            global $database;
            $json = file_get_contents("php://input");
            $data= json_decode($json);
    
    
             $database -> insert("nota", 
            [
                "NOT_FECHA" => $fecha,
                "NOT_HORA" =>  $hora,
                "NOT_MONTO" => $data->NOT_MONTO,
                "NOT_METODO" =>$data->NOT_METODO
            ]);
            
            echo $database -> id();
                   
    
            });


            $router->map('put', 'insertar_art_nota/', function(){
                
                global $database;
                $json = file_get_contents("php://input");
                $data= json_decode($json);
        
        
                 $database -> insert("articulo_nota", 
                [
                    "ART_CVE_ARTICULO" => $data->ART_CVE_ARTICULO,
                    "NOT_CVE_NOTA" => $data->NOT_CVE_NOTA,
                    "ARN_CANTIDAD" => $data->ARN_CANTIDAD,
                    "ART_PRECIO_VENTA" =>$data->ART_PRECIO_VENTA
                ]);
                
                echo $database -> id();
                   
        
                });

                $router->map( 'put', 'modificar_existencias/', function(){
                    global $database;
                    
                    $json = file_get_contents("php://input");
                    $data = json_decode($json);
                    $where = ["ART_CVE_ARTICULO"=>$data->ART_CVE_ARTICULO];
                    
                    $response = $database -> update("articulo",
                    ["ART_CANTIDAD[-]" =>$data->ART_CANTIDAD]
                    ,$where);
            
                    echo $response -> rowCount();
                });

                $router ->map('GET','reporte/',function(){
   
                    global $database;
                    $colum = ["nota.not_cve_nota"," nota.not_fecha","articulo.art_nombre",
                               "articulo_nota.arn_cantidad","articulo_nota.art_precio_venta"];
                    $join = ["[><]articulo_nota" => ["not_cve_nota"=>"not_cve_nota"],
                            "[><]articulo" => ["articulo_nota.art_cve_articulo"=>"art_cve_articulo"]];
                    $res = $database ->select("nota",$join,$colum,["ORDER" =>["not_cve_nota" => "ASC"]]);
                    echo json_encode($res);
                });
        

                $router->map( 'GET', 'llenar1/', function(){
                    global $database;
                    $identificador = $_REQUEST["id"]; //42
                
                
                    $where = ["ART_CVE_ARTICULO" => $identificador];
                
                    $data = $database->select("articulo", '*', $where);
                
                    echo json_encode($data);
                
                    //var_dump($data);
                    });


                $router -> map( 'PUT', 'actualizar_articulo/', function(){
                    global $database;
                    $json = file_get_contents("php://input");
                    $data = json_decode($json);
                    
                    $columns = [
                                "ART_FECHA"=> $data -> ART_FECHA,
                                "ART_NOMBRE"=> $data -> ART_NOMBRE,
                                "ART_DESCRIPCION"=> $data -> ART_DESCRIPCION,
                                "ART_CANTIDAD" =>$data->ART_CANTIDAD,
                                "ART_PRECIO_COMPRA"=> $data -> ART_PRECIO_COMPRA,
                                "ART_PRECIO_VENTA"=> $data -> ART_PRECIO_VENTA,
                                "ART_CATEGORIA"=> $data -> ART_CATEGORIA,
                            ];
                    $where = [
                                "ART_CVE_ARTICULO" => $data -> ART_CVE_ARTICULO
                            ];
                    
                    $database -> update("articulo", $columns, $where);  
                    echo $database -> id();
                });

                