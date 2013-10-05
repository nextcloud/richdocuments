<fieldset class="personalblock" id="documents-personal">
	<h2><?php p($l->t('Documents')); ?></h2>
	<div>
		<label for="documents-default-path"><?php p($l->t('Save new documents to')) ?></label>
		<input type="text" id="documents-default-path" value="<?php p($_['savePath']) ?>" /><span class="msg"></span>
	</div>
</fieldset>
