<?php
session_start();
require_once("../_system/keys.php");
require_once("../_system/connection.php");
require_once("../class/Siyasat/Account.class.php");

$account = new Siyasat\Account($mysqli);

if(empty($_POST['username'])) die(json_encode(array("result"=>False,"message"=>"Username is Required")));
if(empty($_POST['password'])) die(json_encode(array("result"=>False,"message"=>"Password is Required")));

$username = strip_tags($_POST['username']);
$password = strip_tags($_POST['password']);

$result = $account->authenticate(array("username"=>$username,"password"=>$password));

if($result['result'] == False){
    die(json_encode($result));
} else {
    if($result['user']['account_type'] !== "admin"){
        die(json_encode(array("result"=>False,"message"=>"Account not authorized")));
    } else {

        $_SESSION['logged_in'] = True;
        $_SESSION['user'] = $result['user'];
        die(json_encode(array("result"=>True,"message"=>"Admin successfully logged-in","user"=>$result['user'])));

    }
}
?>