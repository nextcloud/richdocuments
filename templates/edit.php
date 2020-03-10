<script nonce="<?php p(\OC::$server->getContentSecurityPolicyNonceManager()->getNonce()) ?>">
	var wopi_title = '<?php p($_['title']) ?>';
	var wopi_fileId = '<?php p($_['fileId']) ?>';
</script>

<?php
style( 'wopi', 'viewer' );
script('wopi', 'viewer');
?>
<div id="app-content"></div>
