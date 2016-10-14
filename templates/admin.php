<?php
script('richdocuments', 'admin');
?>
<div class="section" id="richdocuments">
	<h2><?php p($l->t('Collabora Online')) ?></h2>
	<label for="wopi_url"><?php p($l->t('Collabora Online server')) ?></label>
	<input type="text" name="wopi_url" id="wopi_url" value="<?php p($_['wopi_url'])?>" style="width:300px;">
	<br/><em><?php p($l->t('URL (and port) of the Collabora Online server that provides the editing functionality as a WOPI client.')) ?></em>
	<br/><button type="button" id="wopi_apply"><?php p($l->t('Apply')) ?></button>
	<span id="documents-admin-msg" class="msg"></span>
    <br/>

    <input type="checkbox" class="test-server-enable" id="test_server_enable-richdocuments" />
    <label for="test-server-enable"><?php p($l->t('Enable test server for specific groups')) ?></label><br/>
    <p id="test-server-section" class="indent <?php if ($_['test_server_groups'] === '' || $_['test_wopi_url'] === '') p('hidden') ?>">
        <label for="test_server_group_select"><?php p($l->t('Groups')) ?></label>
        <input type="hidden" id="test_server_group_select" value="<?php p($_['test_server_groups'])?>" title="<?php p($l->t('None')); ?>" style="width: 200px" /><br/>

        <label for="test_wopi_url"><?php p($l->t('Test server')) ?></label>
        <input type="text" name="test_wopi_url" id="test_wopi_url" value="<?php p($_['test_wopi_url'])?>" style="width:300px;" /><br/>
        <em><?php p($l->t('URL (and port) of the Collabora Online test server.')) ?></em><br/>

        <button type="button" id="test_wopi_apply"><?php p($l->t('Apply')) ?></button>
        <span id="test-documents-admin-msg" class="msg"></span>
    </p>
    <input type="checkbox" class="edit-groups-enable" id="edit_groups_enable-richdocuments" />
    <label for="edit_groups_enable-richdocuments"><?php p($l->t('Enable edit for specific groups')) ?></label>
    <input type="hidden" id="edit_group_select" value="<?php p($_['edit_groups'])?>" title="<?php p($l->t('All')); ?>" style="width: 200px">
    <br/>
    <input type="checkbox" class="doc-format-ooxml" id="doc_format_ooxml_enable-richdocuments" <?php p($_['doc_format'] === 'ooxml' ? 'checked' : '') ?> />
    <label for="doc_format_ooxml_enable-richdocuments"><?php p($l->t('Use OOXML by default for new files')) ?></label>
</div>