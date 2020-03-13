<?php
style( 'wopi', 'style' );
script('wopi', 'document');
?>
<input id='wopi_permissions' value='<?php p($_['permissions']) ?>' type='hidden' />
<input id='wopi_title' value='<?php p($_['title']) ?>' type='hidden' />
<input id='wopi_fileId' value='<?php p($_['fileId']) ?>' type='hidden' />
<input id='wopi_token' value='<?php p($_['token']) ?>' type='hidden' />
<input id='wopi_urlsrc' value='<?php p($_['urlsrc']) ?>' type='hidden' />
<input id='wopi_path' value='<?php p($_['path']) ?>' type='hidden' />
<?php if (isset($_['userId'])) { ?>
	<input id='wopi_userId' value='<?php p($_['userId']) ?>' type='hidden' />
<?php } ?>
<input id='wopi_instanceId' value='<?php p($_['instanceId']) ?>' type='hidden' />
<input id='wopi_canonical_webroot' value='<?php p($_['canonical_webroot']) ?>' type='hidden' />
<input id='wopi_directEdit' value='<?php isset($_['direct']) ? p('true') : p('false') ?>' type='hidden' />
<div id="loadingContainer" class="icon-loading"></div>
<div id="documents-content"></div>
