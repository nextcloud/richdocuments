<?php
style('richdocuments', 'admin');
script('richdocuments', 'admin');
script('files', 'jquery.fileupload');

/** @var array $_ */
?>
<div class="section" id="richdocuments">
	<h2>
		<?php p($l->t('Collabora Online')) ?>
		<a target="_blank" rel="noreferrer" class="icon-info"
			title="<?php p($l->t('Open documentation'));?>"
			href="https://nextcloud.github.io/richdocuments/app_settings"></a>
	</h2>
	
	<br/>
	<label for="wopi_url"><?php p($l->t('Collabora Online server')) ?></label>
	<input type="text" name="wopi_url" id="wopi_url" value="<?php p($_['wopi_url'])?>" style="width: 300px; display: block;">
	<em><?php p($l->t('URL (and port) of the Collabora Online server that provides the editing functionality as a WOPI client.')) ?></em>
	<br/><button type="button" id="wopi_apply"><?php p($l->t('Apply')) ?></button>
	<span id="documents-admin-msg" class="msg"></span>
	<br/>
	<br/>
	<input type="checkbox" class="use-groups-enable checkbox" id="use_groups_enable-richdocuments" />
	<label for="use_groups_enable-richdocuments"><?php p($l->t('Restrict usage to specific groups')) ?></label>
	<input type="hidden" id="use_group_select" value="<?php p($_['use_groups'])?>" title="<?php p($l->t('All')); ?>" style="width: 200px; display: block;">
	<br/>
	<input type="checkbox" class="edit-groups-enable checkbox" id="edit_groups_enable-richdocuments" />
	<label for="edit_groups_enable-richdocuments"><?php p($l->t('Restrict edit to specific groups')) ?></label>
	<input type="hidden" id="edit_group_select" value="<?php p($_['edit_groups'])?>" title="<?php p($l->t('All')); ?>" style="width: 200px; display: block;">
	<br/>
	<input type="checkbox" class="doc-format-ooxml checkbox" id="doc_format_ooxml_enable-richdocuments" <?php p($_['doc_format'] === 'ooxml' ? 'checked' : '') ?> />
	<label for="doc_format_ooxml_enable-richdocuments"><?php p($l->t('Use OOXML by default for new files')) ?></label>
	<br/>
	<input type="checkbox" class="checkbox" id="enable_external_apps_cb-richdocuments" <?php p($_['external_apps'] != '' ? 'checked' : '') ?> />
	<label for="enable_external_apps_cb-richdocuments"><?php p($l->t('Enable access for external apps')) ?></label>
	<div id="enable-external-apps-section" class="indent <?php if ($_['external_apps'] == '') p('hidden') ?>" >
		<div id="external-apps-section">
			<input type="hidden" id="external-apps-raw" name="external-apps-raw" value="<?php p($_['external_apps']) ?>">
		</div>

		<button type="button" id="external-apps-save-button"><?php p($l->t('Save')) ?></button>
		<button type="button" id="external-apps-add-button"><?php p($l->t('Add')) ?></button>
		<span id="enable-external-apps-section-msg" class="msg"></span>
	</div>
	<br/>
	<input type="checkbox" class="checkbox" id="enable_canonical_webroot_cb-richdocuments" <?php p($_['canonical_webroot'] != '' ? 'checked' : '') ?> />
	<label for="enable_canonical_webroot_cb-richdocuments"><?php p($l->t('Use Canonical webroot')) ?></label>
	<div id="enable-canonical-webroot-section" class="indent <?php if ($_['canonical_webroot'] == '') p('hidden') ?>" >
		<input type="text" id="canonical-webroot" name="canonical-webroot-name" value="<?php p($_['canonical_webroot']) ?>">
		<br/>
		<p class="rd-settings-documentation"><em><?php p($l->t('Canonical webroot, in case there are multiple, for Collabora to use. Provide the one with least restrictions. Eg: Use non-shibbolized webroot if this instance is accessed by both shibbolized and non-shibbolized webroots. You can ignore this setting if only one webroot is used to access this instance.')) ?></em></p>
	</div>
</div>
<form class="section" id="richdocuments-templates" method="post" action="/template/">
	<input class="hidden-visually" id="add-template" type="file" />
	<h2>
		<?php p($l->t('Global templates')) ?>
		<label for="add-template" class="icon-add" title="<?php p($l->t('Add a new template')); ?>"></label>
	</h2>
	<div id="emptycontent" class="<?php p(empty($_['templates'])?:'hidden') ?>">
		<div class="icon-file"></div>
		<h2>
			<?php p($l->t('No templates defined.')); ?>
		</h2>
		<label for="add-template"><?php p($l->t('Add a new one?')); ?></label>
	</div>
	<ul class="<?php p(!empty($_['templates'])?:'hidden') ?>">
		<li class="hidden template-model">
			<figure>
				<img src="" alt="<?php p($l->t('template preview')) ?>" />
				<figcaption></figcaption>
			</figure>
			<a href="" class="delete-template icon-delete"></a>
			<div class="delete-cover"></div>
		</li>
		<?php foreach ($_['templates'] as $template) {?>
			<li>
				<figure>
					<img src="<?php p($template['preview']) ?>?y=297&x=210" alt="<?php p($l->t('template preview')) ?>" />
					<figcaption><?php p($template['name']) ?></figcaption>
				</figure>
				<a href="<?php p($template['delete']) ?>" class="delete-template icon-delete"></a>
				<div class="delete-cover"></div>
			</li>
		<?php } ?>
	</ul>
</form>
