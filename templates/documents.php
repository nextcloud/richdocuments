<script nonce="<?php p(\OC::$server->getContentSecurityPolicyNonceManager()->getNonce()) ?>">
	var richdocuments_permissions = '<?php p($_['permissions']) ?>';
	var richdocuments_title = '<?php print_unescaped(addslashes($_['title'])) ?>';
	var richdocuments_fileId = '<?php p($_['fileId']) ?>';
	var richdocuments_token = '<?php p($_['token'] ? $_['token'] : "") ?>';
	var richdocuments_urlsrc = '<?php p($_['urlsrc'] ? $_['urlsrc'] : "") ?>';
	var richdocuments_path = '<?php print_unescaped(base64_encode(json_encode($_['path']))); ?>';
	var richdocuments_userId = <?php isset($_['userId']) ? print_unescaped('\'' . \OCP\Util::sanitizeHTML($_['userId']) . '\'') : print_unescaped('null') ?>;
	var richdocuments_instanceId = '<?php p($_['instanceId']) ?>';
	var richdocuments_canonical_webroot = '<?php p($_['canonical_webroot']) ?>';
	var richdocuments_directEdit = <?php isset($_['direct']) ? p('true') : p('false') ?>;
	var richdocuments_directGuest = <?php isset($_['directGuest']) ? p('true') : p('false') ?>;
</script>

<?php
script('richdocuments', 'richdocuments-document');
?>
<div id="loadingContainer"></div>
<div id="proxyLoadingContainer">
	<div id="proxyLoadingIcon"></div>
	<div id="proxyLoadingMessage"></div>
</div>
<div id="documents-content" data-theme-light></div>
