<?php
script('richdocuments', 'admin');
?>
<div class="section" id="documents">
	<h2><?php p($l->t('Documents')) ?></h2>
	<div id="wopi_client">
		<input type="text" name="wopi_url" id="wopi_url" value="<?php p($_['wopi_url'])?>" style="width:250px;">
		<br /><em><?php p($l->t('WOPI Client')) ?></em>
	</div>
	<br /><button type="button" id="docs_apply"><?php p($l->t('Apply')) ?></button>
	<span id="documents-admin-msg" class="msg"></span>
</div>
