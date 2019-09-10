<?php

namespace Siyasat;

class Organization {

    private $mysqli;

    public $id;
    public $name;
    public $short_name;
    public $url;
    public $icon;
    public $category;
    public $region;
    public $timestamp_modified;
    public $timestamp_created;

    function __construct(){
        $this->mysqli = $mysqli;
    }

    function get(Int $id){
        $stmt = $this->mysqli->prepare("SELECT * FROM `organization` WHERE id=? LIMIT 1");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        $stmt->bind_result($id,$name,$short_name,$url,$icon,$category,$region,$timestamp_modified,$timestamp_created);
        
        $array = array();

        while($stmt->fetch()){
            $ar = array(
                "id"=>$id,
                "name"=>$name,
                "short_name"=>$short_name,
                "url"=>$url,
                "icon"=>$icon,
                "category"=>$category,
                "region"=>$region,
                "timestamp_modified"=>$timestamp_modified,
                "timestamp_created"=>$timestamp_created
            );
            $array[] = $ar;
        }

        return $array;
    }

    function delete(Int $id){
        $stmt = $this->mysqli->prepare("DELETE FROM `organization` WHERE id=? LIMIT 1");
        $stmt->bind_param("i",$id);
        if($stmt->execute()){
            return True;
        } else {
            return False;
        }
    }

    function add(Array $array){
        $stmt = $this->mysqli->prepare("INSERT INTO `organization`(`name`,`short_name`,`url`,`icon`,`category`,`region`) VALUES (?,?,?,?,?,?)");
        $name = $array['name'];
        $short_name = $array['short_name'];
        $url = $array['url'];
        $icon = $array['icon'];
        $category = $array['category'];
        $region = $array['region'];
        $stmt->bind_param("ssssss",$name,$short_name,$url,$icon,$category,$region);
        if($stmt->execute()){
            $id = $this->mysqli->insert_id;
            $info = $this->get($id);
            return array("result"=>True,message=>"Added organization","organization"=>$info);
        } else {
            return False;
        }
    }

}

?>