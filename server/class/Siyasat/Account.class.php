<?php

namespace Siyasat;

class Account {

    private $mysql;

    public $id;
    public $first_name;
    public $last_name;
    public $email;
    public $country;
    public $username;
    public $is_blocked;
    public $timestamp_created;

    function __construct($mysqli){
        $this->mysqli = $mysqli;
    }

    public function hashPassword(String $password){
        return password_hash($password, PASSWORD_DEFAULT);
    }

    public function verifyPassword(String $hash, String $password){
        return password_verify($password,$hash);
    }

    public function getPassword(Int $id){
        $stmt = $this->mysqli->prepare("SELECT `password` FROM `account` WHERE id=? LIMIT 1");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        $stmt->bind_result($password);
        $stmt->fetch();
        return $password;
    }

    public function get(Int $id){
        $stmt = $this->mysqli->prepare("SELECT * FROM `account` WHERE id=? LIMIT 1");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        $stmt->bind_result($id,$first_name,$last_name,$email,$country,$username,$password,$is_blocked,$timestamp_created);
        $stmt->fetch();

        $array = array();
        if($first_name){
            $array = array(
                "id"=>$id,
                "first_name"=>$first_name,
                "last_name"=>$last_name,
                "email"=>$email,
                "country"=>$country,
                "username"=>$username,
                "is_blocked"=>$is_blocked,
                "timestamp_created"=>$timestamp_created
            );
        }

        return $array;
    }

    public function getByUsername(String $username){
        $stmt = $this->mysqli->prepare("SELECT * FROM `account` WHERE username LIKE ? LIMIT 1");
        $stmt->bind_param("s",$username);
        $stmt->execute();
        $stmt->bind_result($id,$first_name,$last_name,$email,$country,$username,$password,$is_blocked,$timestamp_created);
        $stmt->fetch();

        $array = array();
        if($first_name){
            $array = array(
                "id"=>$id,
                "first_name"=>$first_name,
                "last_name"=>$last_name,
                "email"=>$email,
                "country"=>$country,
                "username"=>$username,
                "is_blocked"=>$is_blocked,
                "timestamp_created"=>$timestamp_created
            );
        }

        return $array;
    }

    public function delete(Int $id){
        $stmt = $this->mysqli->prepare("DELETE FROM `account` WHERE id=? LIMIT 1");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        return True;
    }

    public function add(Array $array){
        $pw_hash = $this->hashPassword($array['password']);
        $stmt = $this->mysqli->prepare("INSERT INTO `account`(`first_name`,`last_name`,`email`,`country`,`username`,`password`) VALUES(?,?,?,?,?,?) LIMIT 1");
        $stmt->bind_param("");
        
    }

}

?>