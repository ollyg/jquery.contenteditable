<?php

	if ( isset($_POST['id']) && isset($_POST['value']) )
	{
		$data = 'ID: '.$_POST['id'].' Value: '.$_POST['value'];
		file_put_contents('saved-result.txt', $data);

		echo 'success';
		exit;
	}

	echo 'fail';

?>