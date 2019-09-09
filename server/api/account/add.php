<?php
require_once("../common.php");

$first_name = $_REQUEST['first_name'];
$last_name = $_REQUEST['last_name'];
$email = $_REQUEST['email'];
$country = $_REQUEST['country'];
$username = $_REQUEST['username'];
$password = $_REQUEST['password'];

$array = array(
    "first_name"=>$first_name,
    "last_name"=>$last_name,
    "email"=>$email,
    "country"=>$country,
    "username"=>$username,
    "password"=>$password
);

$obj = new Siyasat\Account($mysqli);
$result = $obj->add($array);
echo json_encode($result);
?>