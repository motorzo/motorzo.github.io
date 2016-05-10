<?php

// Replace this with your own email address
$siteOwnersEmail = 'support@motorzo.freshdesk.com';

if($_POST) {

	$username = trim(stripslashes($_POST['username']));
	$email = trim(stripslashes($_POST['email']));
	$userPhone = trim(stripslashes($_POST['userPhone']));
	$selectedService = trim(stripslashes($_POST['selectedService']));
	$userMessage = trim(stripslashes($_POST['userMessage']));
	$error = "";

	// Check Name
	if (strlen($username) < 2) {
		$error['name'] = "Please enter your name.";
	}
	// Check Email
	if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
		$error['email'] = "Please enter a valid email address.";
	}
	// Check Message
	if (strlen($userMessage) < 5) {
		$error['userMessage'] = "Your message should have at least 15 characters.";
	}



	// Set Message
	$message = "Email from: " . $username . "<br />";
	$message .= "Email address: " . $email . "<br />";
	$message .= "Message: <br />";
	$message .= $userMessage;
	$message .="User phone number is: " . $userPhone . "<br />";
    $message .="User Selected Service: " . $selectedService . "<br />";

	$message .= "<br /> ----- <br /> This email was sent from your site's Book Now form. <br />";

	// Set From: header
	$from =  $username . " <" . $email . ">";

	// Email Headers
	$headers = "From: " . $from . "\r\n";
	$headers .= "Reply-To: ". $email . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


	if (!$error) {

		ini_set("sendmail_from", $siteOwnersEmail); // for windows server
		$mail = mail($siteOwnersEmail, $selectedService, $message, $headers);

		if ($mail) { echo "OK"; }
		else { echo "Something went wrong. Please try again."; }

	} # end if - no validation error

	else {

		$response = (isset($error['name'])) ? $error['username'] . "<br /> \n" : null;
		$response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;
		$response .= (isset($error['message'])) ? $error['userMessage'] . "<br />" : null;

		echo $response;

	} # end else - there was a validation error

}

?>