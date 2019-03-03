<?php

    include('database.php');

    if(isset($_POST['title'])){
        $title = $_POST['title'];
        $description = $_POST['description'];
        $image = $_POST['image'];
        $id = $_POST['id'];

        $query = "UPDATE game SET title = '$title', description = '$description', image = '$image' WHERE id = '$id'";

        $result = mysqli_query($connection,$query);
        if(!$result){
            die('Query Failed.');
        }
        //echo 'Task Edited Successfully';
    }

?>