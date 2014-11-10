<div class="section" id="documents">
	<h2><?php p($l->t('Documents')) ?></h2>
	<p><?php p($l->t('MS Word support (requires openOffice/libreOffice)')) ?></p>
	<p>
		<input type="radio" name="docs_converter" value="local" id="docs_converter_local" 
			   <?php print_unescaped($_['converter']=='local' ? 'checked="checked"' : '') ?> 
			   />
		<label for="docs_converter_local"><?php p($l->t('Local')) ?></label><br>
		<em><?php p($l->t('openOffice/libreOffice is installed on this server. Path to binary is provided via preview_libreoffice_path in config.php')) ?></em>
	</p>
	<p>
		<input type="radio" name="docs_converter" value="external" id="docs_converter_external"
			   <?php print_unescaped($_['converter']=='external' ? 'checked="checked"' : '') ?> 
			   />
		<label for="docs_converter_external"><?php p($l->t('External')) ?></label><br>
		<em><?php p($l->t('openOffice/libreOffice is installed on external server running a format filter server')) ?></em>
	</p>
	<p>
		<input type="radio" name="docs_converter" value="off" id="docs_converter_off"
			   <?php print_unescaped($_['converter']=='off' ? 'checked="checked"' : '') ?> 
			   />
		<label for="docs_converter_off"><?php p($l->t('Disabled')) ?></label><br>
		<em><?php p($l->t('No MS Word support')) ?></em>
	</p>
	<div id="docs_extra" <?php print_unescaped($_['converter']!=='external' ? 'style="display:none"' : '') ?>>
	<input type="text" name="docs_url" id="docs_url" 
		   value="<?php p($_['converter_url'])?>" 
		   original-title="<?php p($l->t('scheme://domain.tld[:port]')) ?>" 
		   style="width:250px;"
		   />
	<br /><em><?php p($l->t('Server URL')) ?></em>
	</div>
	<br /><button type="button" id="docs_apply"><?php p($l->t('Apply and test')) ?></button>
	<span id="documents-admin-msg" class="msg"></span>
</div>
