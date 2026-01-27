<?php
require_once('koneksi.php');

$sql = "SELECT * FROM buku";
$r = mysqli_query($con, $sql);
$result = array();

while ($row = mysqli_fetch_array($r)) {
    array_push($result, array(
        "id" => $row['id'],
        "pengarang" => $row['pengarang'],
        "penerbit" => $row['penerbit'],
        "judul" => $row['judul']
    ));
}

echo json_encode(array('result' => $result));
mysqli_close($con);
