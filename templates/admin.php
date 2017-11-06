<?php
script('richdocuments', 'admin');
/** @var array $_ */
?>
<div class="section" id="richdocuments">
	<h2><?php p($l->t('Collabora Online')) ?></h2>
	<label for="wopi_url"><?php p($l->t('Collabora Online server')) ?></label>
	<input type="text" name="wopi_url" id="wopi_url" value="<?php p($_['wopi_url'])?>" style="width:300px;">
	<br/><em><?php p($l->t('URL (and port) of the Collabora Online server that provides the editing functionality as a WOPI client.')) ?></em>
	<br/><button type="button" id="wopi_apply"><?php p($l->t('Apply')) ?></button>
	<span id="documents-admin-msg" class="msg"></span>
    <br/>
	<input type="checkbox" class="use-groups-enable" id="use_groups_enable-richdocuments" />
	<label for="use_groups_enable-richdocuments"><?php p($l->t('Restrict usage to specific groups')) ?></label>
	<input type="hidden" id="use_group_select" value="<?php p($_['use_groups'])?>" title="<?php p($l->t('All')); ?>" style="width: 200px">
	<br/>
	<input type="checkbox" class="edit-groups-enable" id="edit_groups_enable-richdocuments" />
	<label for="edit_groups_enable-richdocuments"><?php p($l->t('Restrict edit to specific groups')) ?></label>
	<input type="hidden" id="edit_group_select" value="<?php p($_['edit_groups'])?>" title="<?php p($l->t('All')); ?>" style="width: 200px">
	<br/>
    <input type="checkbox" class="doc-format-ooxml" id="doc_format_ooxml_enable-richdocuments" <?php p($_['doc_format'] === 'ooxml' ? 'checked' : '') ?> />
    <label for="doc_format_ooxml_enable-richdocuments"><?php p($l->t('Use OOXML by default for new files')) ?></label>
	<br/>
	<input type="checkbox" id="enable_external_apps_cb-richdocuments" <?php p($_['external_apps'] !== '' ? 'checked' : '') ?> />
    <label for="enable_external_apps_cb-richdocuments"><?php p($l->t('Enable access for external apps')) ?></label>
	<div id="enable-external-apps-section" class="indent <?php if ($_['external_apps'] == '') p('hidden') ?>" >
	    <div id="external-apps-section">
	       <input type="hidden" id="external-apps-raw" name="external-apps-raw" value="<?php p($_['external_apps']) ?>">
	    </div>

	    <button type="button" id="external-apps-save-button"><?php p($l->t('Save')) ?></button>
	    <button type="button" id="external-apps-add-button"><?php p($l->t('Add')) ?></button>
	    <span id="enable-external-apps-section-msg" class="msg"></span>
	</div>
</div>
