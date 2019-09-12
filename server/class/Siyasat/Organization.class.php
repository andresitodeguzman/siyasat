<?php

namespace Siyasat;

class Organization {

    private $mysqli;

    public $id;
    public $name;
    public $short_name;
    public $url;
    public $icon;
    public $color;
    public $text_color;
    public $category;
    public $region;
    public $timestamp_modified;
    public $timestamp_created;

    function __construct($mysqli){
        $this->mysqli = $mysqli;
    }

    public function get(Int $id){
        $stmt = $this->mysqli->prepare("SELECT * FROM `organization` WHERE id=? LIMIT 1");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        $stmt->bind_result($id,$name,$short_name,$url,$icon,$color,$text_color,$category,$region,$timestamp_modified,$timestamp_created);
        $stmt->fetch();
        $array = array(
                "id"=>$id,
                "name"=>$name,
                "short_name"=>$short_name,
                "url"=>$url,
                "icon"=>$icon,
                "color"=>$color,
                "text_color"=>$text_color,
                "category"=>$category,
                "region"=>$region,
                "timestamp_modified"=>$timestamp_modified,
                "timestamp_created"=>$timestamp_created
            );

        return $array;
    }

    public function delete(Int $id){
        $stmt = $this->mysqli->prepare("DELETE FROM `organization` WHERE id=? LIMIT 1");
        $stmt->bind_param("i",$id);
        if($stmt->execute()){
            return True;
        } else {
            return False;
        }
    }

    public function add(Array $array){
        $stmt = $this->mysqli->prepare("INSERT INTO `organization`(`name`,`short_name`,`url`,`icon`,`color`,`text_color``category`,`region`) VALUES (?,?,?,?,?,?,?,?)");
        $name = $array['name'];
        $short_name = $array['short_name'];
        $url = $array['url'];
        $icon = $array['icon'];
        $color = $array['color'];
        $text_color = $array['text_color'];
        $category = $array['category'];
        $region = $array['region'];
        $stmt->bind_param("ssssssss",$name,$short_name,$url,$icon,$color,$text_color,$category,$region);
        if($stmt->execute()){
            $id = $this->mysqli->insert_id;
            $info = $this->get($id);
            return array("result"=>True,"message"=>"Added organization","organization"=>$info);
        } else {
            return array("result"=>False,"message"=>"An error occurred");
        }
    }

    public function getAll(){
        $query = "SELECT * FROM `organization` ORDER BY `name` ASC LIMIT 500";
        $array = array();

        if($result = $this->mysqli->query($query)){
            while($a = $result->fetch_array()){
                $ar = array(
                    "id"=>$a['id'],
                    "name"=>$a['name'],
                    "short_name"=>$a['short_name'],
                    "url"=>$a['url'],
                    "icon"=>$a['icon'],
                    "color"=>$a['color'],
                    "text_color"=>$a['text_color'],
                    "category"=>$a['category'],
                    "region"=>$a['region'],
                    "timestamp_modified"=>$a['timestamp_modified'],
                    "timestamp_created"=>$a['timestamp_created']
                );
                $array[] = $ar;
            }
        }

        return $array;

    }

}

?>