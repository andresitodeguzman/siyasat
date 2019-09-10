<?php
require_once("../common.php");

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$country = $_POST['country'];
$username = $_POST['username'];
$password = $_POST['password'];

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