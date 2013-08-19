<div id="controls">
	<div id="invite-block" style="display:none">
		<input id="inivite-input" type="text" />
		<ul id="invitee-list"></ul>
		<button id="invite-send"><?php p('Send Invitation') ?></button>
	</div>
</div>
<div id="office-content">
<?php if(empty($_['list']) && empty($_['sessions'])) { ?>
	<div id="emptyfolder"><?php p('No documents are found. Please upload a document!');?></div>	
<?php } else { ?>
	<div id="editor-content">
	<ul class="documentslist" style="overflow:hidden">
		<li>
			<img class="svg" src="<?php p(\OCP\Util::imagePath('core','actions/add.svg')) ?>" />
		</li>
	<?php foreach ($_['sessions'] as $session){ ?>
		<?php $info = \OCA\Office\Session::getInfo($session['es_id']); ?>
		<li data-esid="<?php p($session['es_id']); ?>">
			Session: <?php p($session['file_id']); ?>
			<?php p($l->t('Users:') . ' ' . $info['users']) ?>
		</li>
	<?php } ?>
	<?php foreach($_['list'] as $entry) { ?>
		<li data-file="<?php p($entry['path']) ?>">
			<img src="<?php p(\OCP\Util::linkToAbsolute('office','ajax/thumbnail.php').'?filepath='.\OCP\Util::encodePath($entry['path'])) ?>" />
			<div class="document-info">
				<a target="_blank" href="<?php p(\OCP\Util::linkToRoute('download', array('file' => $entry['path']))) ?>"><?php p($entry['name'])?></a>
			<?php p(\OCP\Util::formatDate(intval($entry['mtime']))); ?>
			<?php p(\OCP\Util::humanFileSize($entry['size'])); ?>
			</div>
		</li>
	<?php } ?>
	</ul>
	</div>
<?php } ?>
</div>
