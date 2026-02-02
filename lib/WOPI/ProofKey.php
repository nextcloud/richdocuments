<?php
/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\WOPI;

class ProofKey {
	public function __construct(
		private readonly ?string $value,
		private readonly ?string $modulus,
		private readonly ?string $exponent,
	) {
	}

	public function getValue(): ?string {
		return $this->value;
	}

	public function getModulus(): ?string {
		return $this->modulus;
	}

	public function getExponent(): ?string {
		return $this->exponent;
	}
}
