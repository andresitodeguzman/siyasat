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
    public $account_type;
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
        $stmt->bind_result($id,$first_name,$last_name,$country,$email,$username,$password,$is_blocked,$account_type,$timestamp_created);
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
                "account_type"=>$account_type,
                "timestamp_created"=>$timestamp_created
            );
        }

        return $array;
    }

    public function getByUsername(String $username){
        $stmt = $this->mysqli->prepare("SELECT * FROM `account` WHERE username LIKE ? LIMIT 1");
        $stmt->bind_param("s",$username);
        $stmt->execute();
        $stmt->bind_result($id,$first_name,$last_name,$email,$country,$username,$password,$is_blocked,$account_type,$timestamp_created);
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
                "account_type"=>$account_type,
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

    public function usernameExists(String $username){
        $stmt = $this->mysqli->prepare("SELECT `username` FROM `account` WHERE username LIKE ? LIMIT 1");
        $stmt->bind_param("s",$username);
        $stmt->execute();
        $stmt->bind_result($username_e);
        $stmt->fetch();
        if($username_e){
            return True;
        } else {
            return False;
        }
    }

    public function emailExists(String $email){
        $stmt = $this->mysqli->prepare("SELECT `email` FROM `account` WHERE email LIKE ? LIMIT 1");
        $stmt->bind_param("s",$email);
        $stmt->execute();
        $stmt->bind_result($email_e);
        $stmt->fetch();

        if($email_e){
            return True;
        } else {
            return False;
        }
    }

    public function add(Array $array){
        if($this->usernameExists($array['username']) === True){
            return array("result"=>False,"message"=>"Username already in use");
        } else {
            if($this->emailExists($array['email']) === True){
                return array("result"=>False,"message"=>"Email already registered");
            } else {

                if($array['password'] > 8){
                    return array("result"=>False, "message"=>"Password is too short");
                } else {

                    $pw_hash = $this->hashPassword($array['password']);

                    $first_name = $array['first_name'];
                    $last_name = $array['last_name'];
                    $email = $array['email'];
                    $country = $array['country'];
                    $username = $array['username'];                    
                    $is_blocked = "";
                    $account_type = "user";
    
                    $stmt = $this->mysqli->prepare("INSERT INTO `account`(`first_name`,`last_name`,`email`,`country`,`username`,`password`,`is_blocked`,`account_type`) VALUES(?,?,?,?,?,?,?,?)");
                    $stmt->bind_param("ssssssss",$first_name,$last_name,$email,$country,$username,$pw_hash,$is_blocked,$account_type);
                    if($stmt->execute()){
                        $id = $this->mysqli->insert_id;
                        $user = $this->get($id);
                        return array("result"=>True,"message"=>"Account created successfully", "user"=>$user);
                    } else {
                        return array("result"=>False,"message"=>"An error occurred ($stmt->error)");
                    }
    

                }                

            }
        }

    }

    public function authenticate(Array $array){
        $info = $this->getByUsername($array['username']);
        if(!$info){
           return array("result"=>False,"message"=>"Username is not registered"); 
        } else {

            $pw_hash = $this->getPassword($info['id']);
            if($this->verifyPassword($pw_hash,$array['password']) == False){
                return array("result"=>False, "message"=>"Password is incorrect");
            } else {
                return array("result"=>True,"message"=>"Login details are correct","user"=>$info);
            }

        }
    }

}

?>