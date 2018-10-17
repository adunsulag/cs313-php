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
		,'completed' => '09/29/2018'
		,'assignment' => 'Week 2 - Project 1 Proposal'
		,'link' => '/week2/Nielson_Project1_Proposal.docx'
		]
		,['due' => '10/06/2018'
		,'completed' => '09/29/2018'
		,'assignment' => 'Week 3 - Shopping Cart'
		,'link' => '/week3/browse.php'
		]
		,['due' => '10/06/2018'
		,'completed' => '10/17/2018'
		,'assignment' => 'Week 4 - Project 1'
		,'link' => '/project1/client/dist/'
		]
	];
	echo $twig->render('assignments.html.twig', ['assignments' => $assignments]);
?>
