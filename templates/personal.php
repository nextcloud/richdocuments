<?php
script('richdocuments', 'richdocuments-personal');
?>
<div class="section" id="richdocuments">
	<h2>
		<?php p($l->t('Nextcloud Office')) ?>
	</h2>
	<span id="documents-admin-msg" class="msg"></span>
	<p><label for="templateInputField"><?php p($l->t('Select a template directory')); ?></label><br />
		<input type="text" name="templateInputField" id="templateInputField" value="<?php p($_['templateFolder']); ?>" disabled />
		<button id="templateSelectButton"><span class="icon-folder" title="<?php p($l->t('Select a personal template folder')); ?>" data-toggle="tooltip"></span></button>
		<button id="templateResetButton"><span  class="icon-delete" title="<?php p($l->t('Remove personal template folder')); ?>" data-toggle="tooltip"></span></button>
	</p>
	<p><em><?php p($l->t('Templates inside of this directory will be added to the template selector of Nextcloud Office.')); ?></em></p>
	</div>
</div>
