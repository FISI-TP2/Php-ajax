<?php
    $result = mysqli_query($connection,$query);
    if(!$result){
        die('Query Errorx' . mysqli_error($connection));
    }
    $json = array();
    while ($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'image' => $row['image'],
            'description' => $row['description'],
            'title' => $row['title'],
            'id' => $row['id'],
        ); 
    }
    $jsonstring =json_encode($json[0]);
    echo $jsonstring;
?>