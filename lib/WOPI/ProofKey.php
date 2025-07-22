<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\WOPI;

class ProofKey {
	public function __construct(
		private readonly ?string $exponent,
		private readonly ?string $modulus,
		private readonly ?string $value,
	) {
	}

	public function getExponent(): ?string {
		return $this->exponent;
	}

	public function getModulus(): ?string {
		return $this->modulus;
	}

	public function getValue(): ?string {
		return $this->value;
	}
}
