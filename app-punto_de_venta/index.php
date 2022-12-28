<?php
    require 'AltoRouter/AltoRouter.php';
    require 'medoo/src/Medoo.php';

    use Medoo\Medoo;

    $database = new Medoo([
        'database_type' => 'mysql',
        'database_name' => 'inventario',
        'server' => 'localhost',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8',
        'port' => 3306,
        'option' => [
            PDO::ATTR_CASE => PDO::CASE_NATURAL
        ]
    ]);


    $router = new AltoRouter();
    $router-> setBasePath('/PUNTO_DE_VENTA_CA/');

    include 'mapping.php';

    $match = $router->match();
    if(is_array($match) && is_callable($match['target']))
    {
        call_user_func_array($match['target'],$match['params']);
    }
    else
    {
        print_r("error el api no existe");
    }

?>