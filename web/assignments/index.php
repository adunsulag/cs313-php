<?php
	require_once '../../vendor/autoload.php';

	$loader = new Twig_Loader_Filesystem( '../templates');
	$twig = new Twig_Environment($loader);
	$assignments = [
		['due' => '09/22/2018'
		,'completed' => '09/15/2018'
		,'assignment' => 'Week 1 - Hellow World'
		,'link' => '/hello.html'
		]
		,['due' => '09/26/2018'
		,'completed' => '09/22/2018'
		,'assignment' => 'Week 2 - Team Activity'
		,'link' => '/week2/index.html'
		]
		,['due' => '09/29/2018'
		,'completed' => '09/22/2018'
		,'assignment' => 'Week 2 - Homepage'
		,'link' => '/'
		]
		,['due' => '09/29/2018'
		,'completed' => ''
		,'assignment' => 'Week 2 - Project 1 Proposal'
		,'link' => '/'
		]
	];
	echo $twig->render('assignments.html.twig', ['assignments' => $assignments]);
?>
