<?php
script('richdocuments', 'admin');
?>
<div class="section" id="richdocuments">
	<h2><?php p($l->t('Collabora Online')) ?></h2>
	<label for="wopi_url"><?php p($l->t('Collabora Online server')) ?></label>
	<input type="text" name="wopi_url" id="wopi_url" value="<?php p($_['wopi_url'])?>" style="width:300px;">
	<br /><em><?php p($l->t('URL (and port) of the Collabora Online server that provides the editing functionality as a WOPI client.')) ?></em>
	<br /><button type="button" id="docs_apply"><?php p($l->t('Apply')) ?></button>
	<span id="documents-admin-msg" class="msg"></span>
</div>
