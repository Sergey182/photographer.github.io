<?php

$config = parse_ini_file('./config.ini');
$host = $config['host'];
$username = $config['username'];
$password = $config['password'];
$database = $config['database'];
$email = $config['email'];
$success_message = $config['success_message'];
$error_message = $config['error_message'];
$customer_exists_message = $config['customer_exists_message'];

if (!empty($_POST['name']) && !empty($_POST['phone'])) {
    $name = trim($_POST['name']) . substr(0, 20);
    $phone = trim($_POST['phone']);
    $message = trim($_POST['message']);
    $name = mb_substr($name, 0, 30);
    $phone = mb_substr($phone, 0, 20);
    $message = mb_substr($message, 0, 1000);
    $content = "Имя: " . $name . "\nНомер телефона: " . $phone . "\nСообщение: " . $message;

    $mysqli = new mysqli($host, $username, $password, $database);
    if ($mysqli->connect_errno) {
        /*echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;*/
        echo json_encode(array('success' => false,
            'response' => $error_message));
    }

    $result = $mysqli->query("SELECT phone FROM customers WHERE phone='$phone'");
    if ($result->num_rows == 0) {
        if (mail($email, "Заявка с сайта", $content)) {
            $mysqli->query("INSERT INTO customers (name, phone) VALUES ('$name', '$phone')");
            echo json_encode(array('success' => true,
                'response' => $success_message));
        } else echo json_encode(array('success' => false,
            'response' => $error_message));
    } else {
        echo json_encode(array('success' => true,
            'response' => $customer_exists_message));
    }

    $mysqli->close();

} else {
    echo json_encode(array('success' => false,
        'response' => $error_message));
}
