<div id="controls"><button id="session-list"><?php p($l->t('Sessions')) ?></button></div>
<?php if(empty($_['list'])) { ?>
	<div id="emptyfolder"><?php p('No documents are found. Please upload a document into your ownCloud');?></div>	
<?php } else { ?>
	<table class="documentslist" >
	<?php foreach($_['list'] as $entry) { ?>
		<tr data-file="<?php \OCP\Util::encodePath(p($entry['path'])) ?>">
			<td width="1">
				<img align="left" src="<?php p(\OCP\Util::linkToAbsolute('office','ajax/thumbnail.php').'?filepath='.urlencode($entry['url'])) ?>" />
			</td>
			<td width="1">
				<img align="left" src="<?php p( \OCP\Util::linkToAbsolute('office','img/office.png')) ?>" />
			</td>
			<td>
				<a target="_blank" href="<?php p(\OCP\Util::linkToRoute('download', array('file' => $entry['path']))) ?>"><?php p($entry['name'])?></a>
			</td>
			<td><?php p(\OCP\Util::formatDate(intval($entry['mtime']))); ?></td>
			<td><?php p(\OCP\Util::humanFileSize($entry['size'])); ?></td>
		</tr>
	<?php } ?>
	</table>
<?php } ?>
