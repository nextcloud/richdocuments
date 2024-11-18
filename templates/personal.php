<?php
/**
 * SPDX-FileCopyrightText: 2016-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2013-2016 ownCloud, Inc.
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
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
			<p><em><?php p($l->t('To use Zotero specify your API key here. You can create your API key in your')); ?> <a href="https://www.zotero.org/settings/keys" target="_blank"><?php p($l->t('Zotero account API settings.')); ?></a></em></p>
		</div>
	<?php } else { ?>
		<p><em><?php p($l->t('This instance does not support Zotero, because the feature is missing or disabled. Please contact the administration.')); ?></em></p>
	<?php } ?>
	<p><strong><?php p($l->t('Document signing')) ?></strong></p>
	<?php if ($_['hasDocumentSigningSupport']) { ?>
		<div class="input-wrapper">
			<p><label for="documentSigningCertField"><?php p($l->t('Enter document signing cert (in PEM format)')); ?></label><br />
				<textarea type="text" name="documentSigningCertField" id="documentSigningCertField"><?php p($_['documentSigningCert']); ?></textarea><br />
				<button id="documentSigningCertSave"><span title="<?php p($l->t('Save document signing cert')); ?>" data-toggle="tooltip">Save</span></button>
				<button id="documentSigningCertRemove"><span  class="icon-delete" title="<?php p($l->t('Remove document signing cert')); ?>" data-toggle="tooltip"></span></button>
			</p>
			<p><label for="documentSigningKeyField"><?php p($l->t('Enter document signing key')); ?></label><br />
				<textarea type="text" name="documentSigningKeyField" id="documentSigningKeyField"><?php p($_['documentSigningKey']); ?></textarea><br />
				<button id="documentSigningKeySave"><span title="<?php p($l->t('Save document signing key')); ?>" data-toggle="tooltip">Save</span></button>
				<button id="documentSigningKeyRemove"><span  class="icon-delete" title="<?php p($l->t('Remove document signing key')); ?>" data-toggle="tooltip"></span></button>
			</p>
			<p><label for="documentSigningCaField"><?php p($l->t('Enter document signing CA chain')); ?></label><br />
				<textarea type="text" name="documentSigningCaField" id="documentSigningCaField"><?php p($_['documentSigningCa']); ?></textarea><br />
				<button id="documentSigningCaSave"><span title="<?php p($l->t('Save document signing CA chain')); ?>" data-toggle="tooltip">Save</span></button>
				<button id="documentSigningCaRemove"><span  class="icon-delete" title="<?php p($l->t('Remove document signing CA chain')); ?>" data-toggle="tooltip"></span></button>
			</p>
			<p><em><?php p($l->t('To use document signing, specify your signing certificate, key and CA chain here.')); ?></em></p>
		</div>
	<?php } else { ?>
		<p><em><?php p($l->t('This instance does not support document signing, because the feature is missing or disabled. Please contact the administrator.')); ?></em></p>
	<?php } ?>
	</div>
</div>
