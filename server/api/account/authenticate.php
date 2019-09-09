<?php
require_once("../common.php");

$username = $_REQUEST['username'];
$password = $_REQUEST['password'];

$obj = new Siyasat\Account($mysqli);
$result = $obj->authenticate(array("username"=>$username,"password"=>$password));
echo json_encode($result);
?>