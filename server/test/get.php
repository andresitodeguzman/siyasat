<?php
require_once("../_system/keys.php");
require_once("../_system/connection.php");
require_once("../class/Siyasat/Account.class.php");

$obj = new Siyasat\Account($mysqli);
echo json_encode($obj->add(Array(
    "first_name"=>"Andresito",
    "last_name"=>"de Guzman",
    "email"=>"andresitomyemail@gmail.com",
    "country"=>"PH",
    "username"=>"andresitodeguzman1",
    "password"=>"andresitodeguzman"
)));

?>