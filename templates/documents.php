<script nonce="<?php p(\OC::$server->getContentSecurityPolicyNonceManager()->getNonce()) ?>">
	var richdocuments_permissions = '<?php p($_['permissions']) ?>';
	var richdocuments_title = '<?php p($_['title']) ?>';
	var richdocuments_fileId = '<?php p($_['fileId']) ?>';
	var richdocuments_token = '<?php p($_['token']) ?>';
	var richdocuments_urlsrc = '<?php p($_['urlsrc']) ?>';
	var richdocuments_path = '<?php p($_['path']) ?>';
	var instanceId = '<?php p($_['instanceId']) ?>';
	var richdocuments_canonical_webroot = '<?php p($_['canonical_webroot']) ?>';
	var richdocuments_directEdit = <?php isset($_['direct']) ? p('true') : p('false') ?>;
</script>

<?php
style( 'richdocuments', 'style' );
script('richdocuments', 'documents');
?>
<div id="documents-content">
	<ul class="documentslist">
		<li class="progress icon-loading"><div><?php p($l->t('Loading documents…')); ?></div></li>
		<li class="document template" data-id="" style="display:none;">
			<a target="_blank" href=""><label></label></a>
		</li>
	</ul>
</div>
