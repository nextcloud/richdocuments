<?php
/**
 * @copyright Copyright (c) 2022 Raul Ferreira Fuentes <raul@nextcloud.com>
 *
 * @author Raul Ferreira Fuentes <raul@nextcloud.com>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\DirectEditing;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\Controller\DocumentTrait;
use OCA\Richdocuments\Service\InitialStateService;
use OCA\Richdocuments\TokenManager;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\DirectEditing\IEditor;
use OCP\DirectEditing\IToken;
use OCP\Files\InvalidPathException;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IConfig;
use OCP\IInitialStateService;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

class DirectEditor implements IEditor {
	use DocumentTrait;

	/** @var IL10N */
	private $l10n;

	/** @var IInitialStateService */
	private $initialStateService;

	/** @var string[] */
	private $mimetypes;

	/** @var TokenManager */
	private $tokenManager;

	/** @var IRootFolder */
	private $rootFolder;

	/** @var IConfig */
	private $config;

	/** @var AppConfig */
	private $appConfig;

	/** @var LoggerInterface */
	private $logger;


	public function __construct(
		IL10N $l10n,
		InitialStateService $initialStateService,
		Capabilities $capabilities,
		TokenManager $tokenManager,
		IConfig $config,
		AppConfig $appConfig,
		IRootFolder $rootFolder,
		LoggerInterface $logger
	) {
		$this->l10n = $l10n;
		$this->initialStateService = $initialStateService;
		$this->mimetypes = $capabilities->getCapabilities()[Application::APPNAME]['mimetypes'];
		$this->tokenManager = $tokenManager;
		$this->config = $config;
		$this->appConfig = $appConfig;
		$this->rootFolder = $rootFolder;
		$this->logger = $logger;
	}

	/**
	 * Return a unique identifier for the editor
	 *
	 * e.g. richdocuments
	 *
	 * @return string
	 */
	public function getId(): string {
		return Application::APPNAME;
	}

	/**
	 * Return a readable name for the editor
	 *
	 * e.g. Collabora Online
	 *
	 * @return string
	 */
	public function getName(): string {
		return $this->l10n->t('Nextcloud Office');
	}

	/**
	 * A list of mimetypes that should open the editor by default
	 *
	 * @return array
	 */
	public function getMimetypes(): array {
		return $this->mimetypes;
	}

	/**
	 * A list of mimetypes that can be opened in the editor optionally
	 *
	 * @return array
	 */
	public function getMimetypesOptional(): array {
		return [];
	}

	/**
	 * Return a list of file creation options to be presented to the user
	 *
	 * @return array of ACreateFromTemplate|ACreateEmpty
	 */
	public function getCreators(): array {
		return [
			new GraphicsCreator($this->l10n),
			new PresentationCreator($this->l10n),
			new SpreadsheetCreator($this->l10n),
			new TextCreator($this->l10n),
		];
	}

	/**
	 * Return if the view is able to securely view a file without downloading it to the browser
	 *
	 * @return bool
	 */
	public function isSecure(): bool {
		return true;
	}

	/**
	 * Return a template response for displaying the editor
	 *
	 * open can only be called once when the client requests the editor with a one-time-use token
	 * For handling editing and later requests, editors need to impelement their own token handling and take care of invalidation
	 *
	 * This behavior is similar to the current direct editing implementation in collabora where we generate a one-time token and switch over to the regular wopi token for the actual editing/saving process
	 *
	 * @param IToken $token
	 * @return Response
	 */
	public function open(IToken $token): Response {
		$token->useTokenScope();
		try {
			$folder = $this->rootFolder->getUserFolder($token->getUser());
			$item = $token->getFile();

			[$urlSrc, $token, $wopi] = $this->tokenManager->getToken($item->getId(), null, $token->getUser(), true);

			$params = [
				'permissions' => $item->getPermissions(),
				'title' => $item->getName(),
				'fileId' => $wopi->getFileid() . '_' . $this->config->getSystemValue('instanceid'),
				'token' => $wopi->getToken(),
				'token_ttl' => $wopi->getExpiry(),
				'urlsrc' => $urlSrc,
				'path' => $folder->getRelativePath($item->getPath()),
				'instanceId' => $this->config->getSystemValue('instanceid'),
				'canonical_webroot' => $this->appConfig->getAppValue('canonical_webroot'),
				'direct' => true,
			];

			$this->initialStateService->provideDocument($wopi);
			$response = new TemplateResponse('richdocuments', 'documents', $params, 'base');
			$this->applyPolicies($response);
			return $response;
		} catch (InvalidPathException|NotFoundException|NotPermittedException $e) {
			$this->logger->error($e->getMessage());
		}
		return new NotFoundResponse();
	}
}
