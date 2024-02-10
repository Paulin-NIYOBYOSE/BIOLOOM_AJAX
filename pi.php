<?php
$conn = new mysqli("localhost", "root", "", "user_log_in_db");

header("Content-type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

//looping through methods 
if($method == "GET") {
    $results = $conn->query("SELECT * FROM drug_records");
    $records = array();
    while ($row = $results->fetch_assoc()) {
        $records[] = $row;
    }
    echo json_encode($records);
}elseif ($method == "POST") {
    parse_str(file_get_contents("php://input"), $_PUT);
    $name = $_POST["name"];
    $disease = $_POST["disease"];
    $description = $_POST["description"];
    $date = $_POST["date"];
    $conn->query("INSERT INTO drug_records (name, disease, description, date) VALUES ('$name','$disease', '$description', '$date')");

    echo json_encode(array("success" => true));
}elseif($method == "DELETE"){
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'];
    $conn->query("DELETE FROM drug_records WHERE id=$id");
    echo json_encode(array('status' => 'success'));
}elseif ($method == "PUT") {
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_PUT["id"];
    $name = $_PUT["name"];
    $disease = $_PUT["disease"];
    $description = $_PUT["description"];
    $date = $_PUT["date"];
    $conn->query("UPDATE drug_records set name='$name', disease='$disease', description='$description', date='$date' where id=$id");

    echo json_encode(array("success" => true));
}
?>
