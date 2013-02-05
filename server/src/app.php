<?php

use Silex\Application;
use Silex\Provider\ValidatorServiceProvider;
use Silex\Provider\MonologServiceProvider;
use Igorw\Silex\ConfigServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Silex\Provider\TwigServiceProvider;
use Monolog\Logger;
use JavisERP\Silex\Provider\Service\BusinessServiceProvider;
use JavisERP\System\UserProvider;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Silex\Provider\HttpCacheServiceProvider;


define('ROOT_PATH',    __DIR__ . '/..');
define('APP_PATH',   ROOT_PATH . '/src');

$app = new Application();

$app->register(new UrlGeneratorServiceProvider());
$app->register(new SessionServiceProvider());
$app->register(new HttpCacheServiceProvider(), array("http_cache.cache_dir" => ROOT_PATH."/cache/",   ));
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../templates'
));


//loading default configuration
$app->register(new ConfigServiceProvider(ROOT_PATH."/config/default.json"));
$env = getenv("APP_ENV") ? getenv("APP_ENV") : "dev";
//overwriting configuration with enviroment specific
$app->register(new ConfigServiceProvider(ROOT_PATH."/config/$env.json"));

//turn on error reporting for dev purpose
if ($env === "dev"){
    error_reporting(E_ALL | E_STRICT);
    ini_set('display_errors', 1);
    ini_set('log_errors', 1);
    error_reporting(-1);
}

//create connection if configured
if ($app->offsetExists("database.connection")) {
    $app->register(new Silex\Provider\DoctrineServiceProvider(), array(
            "db.options" => $app["database.connection"],
    ));
}

$app['security.firewalls'] = array(
    'secured' => array(
        'pattern' => '^/backoffice',
        'form' => array('login_path' => '/login', 'check_path' => '/backoffice/login_check'),
        'logout' => array('logout_path' => '/backoffice/logout'),
        'users' => $app->share(function () use ($app) {
            return new UserProvider($app['db']);
        })
    )
);

//configure security
$app->register(new Silex\Provider\SecurityServiceProvider());


$app['security.role_hierarchy'] = array(
    'ROLE_ADMIN' => array('ROLE_USER', 'ROLE_ALLOWED_TO_SWITCH', 'ROLE_DESIGNER', 'ROLE_FINANCE')
);


//registering logger
$app->register(new MonologServiceProvider(), array(
        "monolog.logfile" => ROOT_PATH."/logs/".date("Y-m-d").".log",
        "monolog.level" => $app["log.level"],
        "monolog.name" => "application"
));

//load routes files
$routesDir  = APP_PATH."/Classes/Routes";
$routes = scandir($routesDir);
foreach ($routes as $file){
    if (pathinfo($file, PATHINFO_EXTENSION) === "php"){
        $exploded = explode(".", $file);
        $routeToLoad = "Classes\\Routes\\".$exploded[0];
        $app->mount("/".strtolower($exploded[0]), new $routeToLoad);
    }
}

//load business components
$businessDir  = APP_PATH."/Classes/Business";
$business = scandir($businessDir);
$arryToLoad = array();
foreach ($business as $file){
    if (pathinfo($file, PATHINFO_EXTENSION) === "php"){
        $exploded = explode(".", $file);
        $arryToLoad[strtolower($exploded[0])] = "Classes\\Business\\".$exploded[0];
    }
}

$app->register(new BusinessServiceProvider(),array("business.container" =>  $arryToLoad));

//handling calls to the root to a default route manager
$app->get("/backoffice", function () use ($app) {
    return $app['twig']->render('index.html');
});

$app->get("/login", function(Request $request) use ($app) {
    return $app['twig']->render('login.html', array(
        'error'         => $app['security.last_error']($request),
        'last_username' => $app['session']->get('_security.last_username')
    ));
});

//managing errors
$app->error(function (\Exception $e, $code) use ($app) {
    $app['monolog']->addInfo($e->getMessage());
    $app['monolog']->addInfo($e->getTraceAsString());
    switch ($code) {
        case 404:
            $message = "Resource not found.";
            break;
        case 401:
            $message = "Unauthorized.";
            break;
        default:
            $message = "Internal server error.";
    }
    return $app->json(array("statusCode"=>$code, "message" => $message));
});

return $app;
