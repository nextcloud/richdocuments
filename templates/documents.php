<?php
style( 'richdocuments', 'style' );
script('richdocuments', 'document');
?>
<input id='richdocuments_permissions' value='<?php p($_['permissions']) ?>' type='hidden' />
<input id='richdocuments_title' value='<?php p($_['title']) ?>' type='hidden' />
<input id='richdocuments_fileId' value='<?php p($_['fileId']) ?>' type='hidden' />
<input id='richdocuments_token' value='<?php p($_['token']) ?>' type='hidden' />
<input id='richdocuments_urlsrc' value='<?php p($_['urlsrc']) ?>' type='hidden' />
<input id='richdocuments_path' value='<?php p($_['path']) ?>' type='hidden' />
<?php if (isset($_['userId'])) { ?>
	<input id='richdocuments_userId' value='<?php p($_['userId']) ?>' type='hidden' />
<?php } ?>
<input id='richdocuments_instanceId' value='<?php p($_['instanceId']) ?>' type='hidden' />
<input id='richdocuments_canonical_webroot' value='<?php p($_['canonical_webroot']) ?>' type='hidden' />
<input id='richdocuments_directEdit' value='<?php isset($_['direct']) ? p('true') : p('false') ?>' type='hidden' />
<div id="loadingContainer" class="icon-loading"></div>
<div id="documents-content"></div>
