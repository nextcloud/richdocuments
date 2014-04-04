<div id="notification-container">
	<div id="notification" style="display: none;"></div>
</div>
<div id="documents-content">
	<?php if (isset($_['hasPassword'])): ?>
		<?php if (isset($_['wrongpw'])): ?>
			<div class="push"></div>
			<div class="warning"><?php p($l->t('Wrong password. Please retry.')) ?></div>
		<?php endif; ?>
		<form method="post">
			<input type="password" name="password" placeholder="<?php p($l->t('Password')) ?>" />
			<input type="submit" name="submit" value="<?php p($l->t('OK')) ?>" />
		</form>
	<?php endif; ?>
	<?php if (isset($_['document']) && !isset($_['wrongpw'])): ?>
		<input type="hidden" name="document" value ="<?php p($_['document']) ?>" />
		<input type="hidden" name="memberName" value ="<?php p($l->t('Guest %s' ,$_['total'])) ?>" />
	<?php endif; ?>
	<?php if (isset($_['notFound'])): ?>
		<div class="push"></div>
		<div class="warning"><?php p($l->t('This link has been expired or is never existed. Please contact the person who shared it with you for details.')) ?></div>
	<?php endif; ?>
</div>
