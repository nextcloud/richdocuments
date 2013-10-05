<fieldset class="personalblock" id="documents">
	<h2><?php p($l->t('Documents')) ?></h2>
	<input id="webodf-unstable" type ="checkbox"
		<?php if ($_['unstable'] === 'true'){ ?>
			checked="checked"
		<?php } ?>
	/>
	<label for="webodf-unstable">
		<?php p($l->t('Advanced feature-set'))?>&nbsp;
		<?php p($l->t('(Unstable)')); ?>
	</label>
</fieldset>
