<script nonce="<?php p(\OC::$server->getContentSecurityPolicyNonceManager()->getNonce()) ?>">
	var wopi_permissions = '<?php p($_['permissions']) ?>';
	var wopi_title = '<?php p($_['title']) ?>';
	var wopi_fileId = '<?php p($_['fileId']) ?>';
	var wopi_token = '<?php p($_['token']) ?>';
	var wopi_urlsrc = '<?php p($_['urlsrc']) ?>';
	var wopi_path = '<?php p($_['path']) ?>';
	var wopi_userId = <?php isset($_['userId']) ? print_unescaped('\'' . \OCP\Util::sanitizeHTML($_['userId']) . '\'') : print_unescaped('null') ?>;
	var wopi_instanceId = '<?php p($_['instanceId']) ?>';
	var wopi_canonical_webroot = '<?php p($_['canonical_webroot']) ?>';
	var wopi_directEdit = <?php isset($_['direct']) ? p('true') : p('false') ?>;
</script>

<?php
style( 'wopi', 'style' );
script('wopi', 'document');
?>
<div id="loadingContainer" class="icon-loading"></div>
<div id="documents-content"></div>
