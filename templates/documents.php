<?php


if(empty($_['list'])) {
	
	    echo('<div id="emptyfolder">No documents are found. Please upload a document into your ownCloud</div>');		

}else{

	echo('<table class="documentslist" >');
	foreach($_['list'] as $entry) {
		echo('
		<tr>
			<td width="1"><img align="left" src="'.\OCP\Util::linkToAbsolute('office','ajax/thumbnail.php').'?filepath='.urlencode($entry['url']).'"></td>
			<td width="1"><img align="left" src="'.\OCP\Util::linkToAbsolute('office','img/office.png').'"></td>
			<td><a target="_blank" href="'.\OCP\Util::linkToAbsolute('files','download.php').'&file='.urlencode($entry['url']).'&name='.urlencode($entry['name']).'">'.$entry['name'].'</a></td>
			<td>'.\OCP\Util::formatDate($entry['mtime']).'</td><td>'.\OCP\Util::humanFileSize($entry['size']).'</td>
		</tr>'
		);
	}
	echo('</table>');
	
	
	
}


