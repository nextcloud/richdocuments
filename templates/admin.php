<?php $isLocal = $_['converter']=='local' ?>
<fieldset class="personalblock" id="documents">
	<h2><?php p($l->t('Documents')) ?></h2>
	<p>
		<input type="radio" name="docs_converter" value="local" id="docs_converter_local" 
			   <?php print_unescaped($isLocal ? 'checked="checked"' : '') ?> 
			   />
		<label for="docs_converter_local"><?php p($l->t('Local')) ?></label><br>
		<em><?php p($l->t('openOffice/libreOffice is installed on this server')) ?></em>
	</p>
	<p>
		<input type="radio" name="docs_converter" value="external" id="docs_converter_external"
			   <?php print_unescaped(!$isLocal ? 'checked="checked"' : '') ?> 
			   />
		<label for="docs_converter_external"><?php p($l->t('External')) ?></label><br>
		<em><?php p($l->t('openOffice/libreOffice is installed on another server')) ?></em>
	</p>
	<div id="docs_extra" <?php print_unescaped($isLocal ? 'style="display:none"' : '') ?>>
	<input type="text" name="docs_url" id="docs_url" 
		   value="<?php p($_['converter_url'])?>" 
		   original-title="<?php p($l->t('scheme://domain.tld[:port]')) ?>" 
		   style="width:250px;"
		   />
	<br /><em><?php p($l->t('Server URL')) ?></em>
	</div>
	<br /><button type="button" id="docs_apply"><?php p($l->t('Apply')) ?></button>
</fieldset>
