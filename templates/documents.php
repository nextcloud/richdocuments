<?php
style( 'richdocuments', 'share' );
style( 'richdocuments', 'style' );
script('richdocuments', 'share');
script('richdocuments', 'documents');
script('files', 'file-upload');
script('files', 'jquery.fileupload');
?>
<div id="documents-content">
	<ul class="documentslist">
		<li class="progress icon-loading"><div><?php p($l->t('Loading documents...')); ?></div></li>
		<li class="document template" data-id="" style="display:none;">
			<a target="_blank" href=""><label></label></a>
		</li>
	</ul>
</div>
<input type="hidden" id="wopi-url" name="wopi-url" value="<?php p($_['wopi_url']) ?>" />
<?php if ($_['enable_previews']): ?>
<input type="hidden" id="previews_enabled" value="<?php p($_['enable_previews']) ?>" />
<?php endif; ?>
<input type="hidden" name="allowShareWithLink" id="allowShareWithLink" value="<?php p($_['allowShareWithLink']) ?>" />