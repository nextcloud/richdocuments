<ul>
	<li>
		<input id="webodf-unstable" type ="checkbox"
		<?php if (\OCP\Config::getAppValue('office', 'unstable', 'false') === 'true'){?>
			checked="checked"
		<?php } ?>
			   value="<?php p($_['unstable']); ?>" />
		<label for="webodf-unstable"><?php p($l->t('Unstable WebODF Features')); ?></label>
	</li>
</ul>