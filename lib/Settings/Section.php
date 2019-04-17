<?php
/**
 * @copyright Copyright (c) 2016 Lukas Reschke <lukas@statuscode.ch>
 *
 * @author Lukas Reschke <lukas@statuscode.ch>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\Settings;

use OCA\Richdocuments\Capabilities;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Settings\IIconSection;

class Section implements IIconSection {
	/** @var IL10N */
	private $l10n;
	/** @var IURLGenerator */
	private $url;
	/** @var Capabilities */
	private $capabilitites;

	/**
	 * @param IL10N $l
	 * @param IURLGenerator $url
	 */
	public function __construct(IL10N $l10n, IURLGenerator $url, Capabilities $capabilities) {
		$this->l10n = $l10n;
		$this->url = $url;
		$this->capabilitites = $capabilities;
	}
	/**
	 * {@inheritdoc}
	 */
	public function getID() {
		return 'richdocuments';
	}
	/**
	 * {@inheritdoc}
	 */
	public function getName() {
		$capabilitites = $this->capabilitites->getCapabilities();
		if (isset($capabilitites['richdocuments']['productName'])) {
			return $capabilitites['richdocuments']['productName'];
		}
		return $this->l10n->t('Collabora Online');
	}
	/**
	 * {@inheritdoc}
	 */
	public function getPriority() {
		return 75;
	}

	/**
	 * {@inheritdoc}
	 */
	public function getIcon() {
		return $this->url->imagePath('richdocuments', 'app-dark.svg');
	}
}
