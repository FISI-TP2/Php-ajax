<?php 

    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];
       
    $query = "SELECT * FROM game WHERE id='$id'";

    include('json-single-item.php');

    }
?>