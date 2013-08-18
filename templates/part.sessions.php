<?php foreach ($_['invites'] as $invite){ ?>
<div><a href="" data-esid="<?php p($invite['es_id']); ?>"><?php p($invite['es_id']); ?></a></div>
<?php } ?>
<?php foreach ($_['sessions'] as $session){ ?>
<div><a href="" data-esid="<?php p($session['es_id']); ?>">Session: <?php p($session['file_id']); ?></a></div>
<?php } ?>
