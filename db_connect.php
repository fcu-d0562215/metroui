<?php
    define('DB_USER', "wp-project");
    define('DB_PASSWORD', "wp-project");
    define('DB_DATABASE', "28.10.2016");
    define('DB_SERVER', "localhost"); 
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }
?>



