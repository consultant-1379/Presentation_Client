<?php

header('Cache-Control: no-cache');

require 'Slim/Slim.php';

$app = new Slim();
$app->post('/login', function () use ($app) {
    $data = array();
    $data['login'] = $app->request()->post('login');
    $data['password'] = '';

    if ($data['login'] != 'joe') {
        $app->halt(403, 'User not found');
        return;
    }

    echo json_encode($data);
});
$app->run();

?>
