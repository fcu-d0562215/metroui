<?php
    require_once("db_connect.php");
    $result = mysqli_query($db,"SELECT * FROM products") or die(mysqli_error());
    $str = '';
    $str.="<table class='table-hover table'><thead><th>asd</th><th>asd</th><th>asd</th><th>asd</th><th>asd</th></thead>";
    while ($row = mysqli_fetch_row($result)) {
        $str.="<tr>";
        for ($i=0; $i < count($row) ; $i++) { 
            $str.="<td>$row[$i]</td>";
        }
        $str.="</tr>";
    }
    $str.=("</table>");
    echo "$str";
    require_once("db_close.php");
?>