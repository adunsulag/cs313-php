<?php

if (!isset($title)) {
	$title = 'Stephen Nielson CS-313';
}
if (!isset($selectedMenu)) {

}
<html>
	<head>
		<title>Stephen Nielson CS-313</title>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
		
	</head>
	<body>
		<header>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <a class="navbar-brand" href="/">Stephen Nielson Software</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>

		  <div class="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul class="navbar-nav mr-auto">
		      <li class="nav-item active">
			<a class="nav-link" href="/">Home<span class="sr-only">(current)</span></a>
		      </li>
		      <li class="nav-item">
			<a class="nav-link" href="/assignments/">Assignments</a>
		      </li>
		      <li class="nav-item">
			<a class="nav-link" href="https://www.linkedin.com/in/nielsonstephen/">Linked In</a>
		      </li>
		      <li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			  Ongoing Projects
			</a>
			<div class="dropdown-menu" aria-labelledby="navbarDropdown">
			  <a class="dropdown-item" href="https://www.discoverandchange.com/">Discover and Change - Client Education</a>
			  <a class="dropdown-item" href="https://tests.discoverandchange.com/register">Discover and Change - Therapist Assessments</a>
			  <a class="dropdown-item" href="https://agents.mycommonsensefinancial.com/">Life Insurance Agent Site</a>
			</div>
		      </li>
		    </ul>
		    <form class="form-inline my-2 my-lg-0">
		      <input id="search" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
		      <button id="goSearchBtn" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
		    </form>
		  </div>
		</nav>
		</header>
