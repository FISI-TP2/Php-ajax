<?php

    include('database.php');

    $search = $_POST['search'];

    if(!empty($search)){
        $query = "SELECT * FROM game WHERE title like '$search%'";

        include('json-all-items.php');
    }

?>