<?php
require_once("../_system/keys.php");
require_once("../_system/connection.php");
require_once("../class/Siyasat/Account.class.php");

$obj = new Siyasat\Account($mysqli);
/*echo json_encode($obj->add(array(
    "name"=>"Rappler",
    "short_name"=>"rappler",
    "url"=>"google.com",
    "icon"=>"",
    "category"=>"ngo",
    "region"=>"NCR"
)));*/

echo json_encode($obj->get(1));

?>