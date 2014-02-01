<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
*/

$route['default_controller'] = "overview";
$route['404_override'] = 'lost';

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
*/

$route['watch/(:any)/(:any)'] = "watch/single/$1/$2";

/* End of file routes.php */
/* Location: ./application/config/routes.php */