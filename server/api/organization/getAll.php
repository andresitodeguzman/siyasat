<?php
require_once("../common.php");

$obj = new Siyasat\Organization($mysqli);
$result = $obj->getAll();
echo json_encode($result);
?>