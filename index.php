<?php

ini_set('display_errors', 0);

require_once __DIR__.'/server/vendor/autoload.php';

$app = require __DIR__.'/server/src/app.php';
require __DIR__.'/server/config/prod.php';
//require __DIR__.'/../src/controllers.php';
$app->run();
