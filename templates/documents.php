<?php $isAdmin = \OC_User::isAdminUser(\OCP\User::getUser()); ?>
<div id="controls">
	
<?php if ($isAdmin){ ?>
	<?php $src = OCP\Util::imagePath('core', 'actions/settings.png'); ?>
	<button id="settingsbtn" class="office-settings-btn" title="<?php p($l->t('Settings')); ?>">
		<img class="svg" src="<?php print_unescaped($src); ?>" alt="<?php p($l->t('Settings')); ?>" />
	</button>
<?php } ?>
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
	<table class="documentslist" >
	<?php foreach ($_['sessions'] as $session){ ?>
		<?php $info = \OCA\Office\Session::getInfo($session['es_id']); ?>
		<tr data-esid="<?php p($session['es_id']); ?>">
			<td></td>
			<td width="100%">Session: <?php p($session['file_id']); ?></td>
			<td><?php p($l->t('Users:') . ' ' . $info['users']) ?></td>
			<td></td>
		</tr>
	<?php } ?>
	<?php foreach($_['list'] as $entry) { ?>
		<tr data-file="<?php p($entry['path']) ?>">
			<td>
				<img align="left" src="<?php p(\OCP\Util::linkToAbsolute('office','ajax/thumbnail.php').'?filepath='.\OCP\Util::encodePath($entry['path'])) ?>" />
			</td>
			<!--<td>
				<img align="left" src="<?php p( \OCP\Util::linkToAbsolute('office','img/office.png')) ?>" />
			</td> -->
			<td width="100%">
				<a target="_blank" href="<?php p(\OCP\Util::linkToRoute('download', array('file' => $entry['path']))) ?>"><?php p($entry['name'])?></a>
				<span class="session-info"></span>
			</td>
			<td><?php p(\OCP\Util::formatDate(intval($entry['mtime']))); ?></td>
			<td><?php p(\OCP\Util::humanFileSize($entry['size'])); ?></td>
		</tr>
	<?php } ?>
	</table>
	</div>
<?php } ?>
</div>
<?php if ($isAdmin){ ?>
	<div id="appsettings" class="popup hidden topright"></div>
<?php } ?>