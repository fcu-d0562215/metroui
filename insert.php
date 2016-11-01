<?php
if ( isset($_POST["name"]) && isset($_POST["location"]) && !empty($_POST["location"]) && !empty($_POST["location"]) ) {
    require_once("db_connect.php");
    $name = $_POST["name"];
    $amount = $_POST["amount"];
    $unit = $_POST["unit"];
    $location = $_POST["location"];
    $sql = "INSERT INTO `products` (`name`, `amount`,`unit`,`location`) VALUES ('$name', '$amount','$unit','$location')";
    if(mysqli_query($db,$sql)){
        echo "true";
    }else{
        echo "false";
    }
    require_once("db_close.php");
}else{
     echo "false";
}
?>
