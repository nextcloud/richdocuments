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
	<p><strong><?php p($l->t('Zotero')) ?></strong></p>
	<?php if ($_['hasZoteroSupport']) { ?>
		<div class="input-wrapper">
			<p><label for="zoteroAPIKeyField"><?php p($l->t('Enter Zotero API Key')); ?></label><br />
				<input type="text" name="zoteroAPIKeyField" id="zoteroAPIKeyField" value="<?php p($_['zoteroAPIKey']); ?>"/>
				<button id="zoteroAPIKeySave"><span title="<?php p($l->t('Save Zotero API key')); ?>" data-toggle="tooltip">Save</span></button>
				<button id="zoteroAPIKeyRemove"><span  class="icon-delete" title="<?php p($l->t('Remove Zotero API Key')); ?>" data-toggle="tooltip"></span></button>
			</p>
			<p><em><?php p($l->t('To use Zotero specify your API key here. You can create your API key in your ')); ?> <a href="https://www.zotero.org/settings/keys" target="_blank"><?php p($l->t('Zotero account API settings.')); ?></a></em></p>
		</div>
	<?php } else { ?>
		<p><em><?php p($l->t('This instance does not support Zotero, because the feature is missing or disabled. Please contact the admin.')); ?></em></p>
	<?php } ?>
	</div>
</div>
