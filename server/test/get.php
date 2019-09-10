<?php
require_once("../_system/keys.php");
require_once("../_system/connection.php");
require_once("../class/Siyasat/Organization.class.php");

$obj = new Siyasat\Organization($mysqli);
/*echo json_encode($obj->add(array(
    "name"=>"Rappler",
    "short_name"=>"rappler",
    "url"=>"google.com",
    "icon"=>"",
    "category"=>"ngo",
    "region"=>"NCR"
)));*/

echo json_encode($obj->getAll());

?>