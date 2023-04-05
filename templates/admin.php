<?php
script('richdocuments', 'richdocuments-admin');
script('files', 'jquery.fileupload');

/** @var array $_ */
?>
<div id="admin-vue" data-initial="<?php p(json_encode($_['settings'], true)); ?>"></div>

<?php if ($_['settings']['templatesAvailable'] === true) { ?>
<form class="section" id="richdocuments-templates" method="post" action="/template/">
	<input name="files" class="hidden-visually" id="add-template" type="file" />
	<h2>
		<?php p($l->t('Global templates')) ?>
		<label for="add-template" class="icon-add" title="<?php p($l->t('Add a new template')); ?>"></label>
	</h2>
	<div id="emptycontent" class="<?php p(empty($_['settings']['templates'])?:'hidden') ?>">
		<div class="icon-file"></div>
		<h2>
			<?php p($l->t('No templates defined.')); ?>
		</h2>
		<label for="add-template"><?php p($l->t('Add a new one?')); ?></label>
	</div>
	<ul class="<?php p(!empty($_['settings']['templates'])?:'hidden') ?>">
		<li class="hidden template-model">
			<figure>
				<img src="" alt="<?php p($l->t('template preview')) ?>" />
				<figcaption></figcaption>
			</figure>
			<a href="" class="delete-template icon-delete"></a>
			<div class="delete-cover"></div>
		</li>
		<?php foreach ($_['settings']['templates'] as $template) {?>
			<li data-filename="<?php p($template['name']); ?>">
				<figure>
					<?php if (isset($template['preview'])) { ?>
						<img src="<?php p($template['preview']) ?>?y=297&x=210" alt="<?php p($l->t('template preview')) ?>" />
					<?php } else { ?>
						<div class="templatePlaceholder"></div>
					<?php } ?>
					<figcaption><?php p($template['name']) ?></figcaption>
				</figure>
				<?php if (isset($template['delete'])) { ?><a href="<?php p($template['delete']) ?>" class="delete-template icon-delete"></a><?php } ?>
				<div class="delete-cover"></div>
			</li>
		<?php } ?>
	</ul>
</form>
<?php } ?>

