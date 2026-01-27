<?php 
    require_once('koneksi.php');
    $id = $_GET['id'];

    $sql = "SELECT * FROM inventaris WHERE id=$id";
    $r = mysqli_query($con, $sql);
    $result = array();
    $row = mysqli_fetch_array($r);

    array_push($result, array(
        "id" => $row['id'],
        "nama_barang" => $row['nama_barang'],
        "kode_barang" => $row['kode_barang'],
        "jumlah" => $row['jumlah']
    ));

    echo json_encode(array('result' => $result));
    mysqli_close($con);
?>