<div id="controls">
	<div id="invite-block" style="display:none">
		<input id="inivite-input" type="text" />
		<ul id="invitee-list"></ul>
		<button id="invite-send"><?php p('Send Invitation') ?></button>
	</div>
</div>
<div id="office-content">
	<div id="editor-content">
	<ul class="documentslist">
		<li class="add-document">
			<img class="svg" src="<?php p(\OCP\Util::imagePath('core','actions/add.svg')) ?>" />
		</li>
		<li class="document template" data-file="" style="display:none;">
			<div class="document-info">
				<a target="_blank" href=""></a>
			</div>
		</li>
	</ul>
	</div>
</div>
