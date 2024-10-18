<?php
/**
 * SPDX-FileCopyrightText: 2016-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2014-2016 ownCloud, Inc.
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
\OCP\Util::addScript('richdocuments', 'richdocuments-admin');

/** @var array $_ */
?>
<div id="admin-vue" data-initial="<?php p(json_encode($_['settings'], true)); ?>"></div>