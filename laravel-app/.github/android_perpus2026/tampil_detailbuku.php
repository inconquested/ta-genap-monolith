<?php
require_once('koneksi.php');

// Check if ID is provided in the URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "SELECT * FROM buku WHERE id=$id";
    $r = mysqli_query($con, $sql);

    $result = array();

    // Use a loop or check if row exists to avoid "null" errors
    if ($row = mysqli_fetch_array($r)) {
        array_push($result, array(
            "id" => $row['id'],
            "judul" => $row['judul'],
            "pengarang" => $row['pengarang'],
            "penerbit" => $row['penerbit']
        ));
    }

    echo json_encode(array('result' => $result));
} else {
    echo "Error: ID not provided";
}

mysqli_close($con);
