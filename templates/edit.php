<?php
style( 'wopi', 'viewer' );
script('wopi', 'viewer');
?>
<input type="hidden" value="<?php p($_['title']) ?>" id="wopi_title" />
<input type="hidden" value="<?php p($_['fileId']) ?>" id="wopi_fileId" />
<div id="app-content"></div>
