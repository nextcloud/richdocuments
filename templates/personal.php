<fieldset class="personalblock" id="documents-personal">
	<legend><strong><?php p($l->t('Documents')); ?></strong></legend>
	<div>
		<label for="documents-default-path"><strong><?php p($l->t('Save new documents to')) ?></strong></label>
		<input type="text" id="documents-default-path" value="<?php p($_['savePath']) ?>" /><span class="msg"></span>
	</div>
</fieldset>