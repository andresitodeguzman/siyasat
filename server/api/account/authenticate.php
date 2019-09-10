<?php
require_once("../common.php");

$username = $_POST['username'];
$password = $_POST['password'];

$obj = new Siyasat\Account($mysqli);
$result = $obj->authenticate(array("username"=>$username,"password"=>$password));
echo json_encode($result);
?>