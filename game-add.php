<?php

    include('database.php');

    if(isset($_POST['title'])){
        $title = $_POST['title'];
        $description = $_POST['description'];
        $image = $_POST['image'];

        $query = "INSERT INTO game(title,description,image) VALUES('$title','$description','$image')";

        $result = mysqli_query($connection,$query);
        if(!$result){
            die('Query Failed.');
        }
        echo 'Task Added Successfully';
    }

?>