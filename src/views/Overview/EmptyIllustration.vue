<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="empty-illustration">
		<div class="empty-illustration__art" aria-hidden="true">
			<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
				<!-- Soft halo behind the illustration. -->
				<ellipse cx="100"
					cy="92"
					rx="84"
					ry="60"
					class="empty-illustration__halo" />

				<!-- recent: clock-on-document -->
				<g v-if="kind === 'recent'" class="empty-illustration__line">
					<path d="M64 30 L114 30 L134 50 L134 130 L64 130 Z" class="empty-illustration__paper" />
					<path d="M114 30 L114 50 L134 50" />
					<line x1="76"
						y1="68"
						x2="120"
						y2="68"
						class="empty-illustration__faded" />
					<line x1="76"
						y1="80"
						x2="112"
						y2="80"
						class="empty-illustration__faded" />
					<circle cx="124"
						cy="106"
						r="20"
						class="empty-illustration__paper" />
					<line x1="124"
						y1="92"
						x2="124"
						y2="106" />
					<line x1="124"
						y1="106"
						x2="135"
						y2="113" />
				</g>

				<!-- shared: two friends + a doc -->
				<g v-else-if="kind === 'shared'" class="empty-illustration__line">
					<path d="M78 50 L122 50 L122 110 L78 110 Z" class="empty-illustration__paper" />
					<line x1="86"
						y1="68"
						x2="114"
						y2="68"
						class="empty-illustration__faded" />
					<line x1="86"
						y1="80"
						x2="106"
						y2="80"
						class="empty-illustration__faded" />
					<circle cx="40"
						cy="80"
						r="14"
						class="empty-illustration__paper" />
					<circle cx="40"
						cy="76"
						r="4"
						class="empty-illustration__fill" />
					<path d="M30 92 a10 10 0 0 1 20 0" class="empty-illustration__faded" />
					<circle cx="160"
						cy="80"
						r="14"
						class="empty-illustration__paper" />
					<circle cx="160"
						cy="76"
						r="4"
						class="empty-illustration__fill" />
					<path d="M150 92 a10 10 0 0 1 20 0" class="empty-illustration__faded" />
					<line x1="54"
						y1="80"
						x2="78"
						y2="80"
						class="empty-illustration__dashed" />
					<line x1="122"
						y1="80"
						x2="146"
						y2="80"
						class="empty-illustration__dashed" />
				</g>

				<!-- templates: paper with a + badge -->
				<g v-else-if="kind === 'templates'" class="empty-illustration__line">
					<path d="M58 28 L108 28 L128 48 L128 132 L58 132 Z" class="empty-illustration__paper" />
					<path d="M108 28 L108 48 L128 48" />
					<line x1="70"
						y1="68"
						x2="116"
						y2="68"
						class="empty-illustration__faded" />
					<line x1="70"
						y1="82"
						x2="112"
						y2="82"
						class="empty-illustration__faded" />
					<line x1="70"
						y1="96"
						x2="100"
						y2="96"
						class="empty-illustration__faded" />
					<circle cx="138"
						cy="124"
						r="18"
						class="empty-illustration__badge" />
					<line x1="138"
						y1="116"
						x2="138"
						y2="132"
						class="empty-illustration__badge-stroke" />
					<line x1="130"
						y1="124"
						x2="146"
						y2="124"
						class="empty-illustration__badge-stroke" />
				</g>

				<!-- decorative dots, identical across all kinds -->
				<g class="empty-illustration__sparkles">
					<circle cx="32" cy="48" r="2.5" />
					<circle cx="170" cy="38" r="3" />
					<circle cx="178" cy="118" r="2" />
					<circle cx="22" cy="118" r="2" />
				</g>
			</svg>
		</div>

		<h3 class="empty-illustration__title">
			{{ title }}
		</h3>
		<p v-if="description" class="empty-illustration__description">
			{{ description }}
		</p>
		<div v-if="$slots.action" class="empty-illustration__action">
			<slot name="action" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'EmptyIllustration',
	props: {
		kind: {
			type: String,
			required: true,
			validator: v => ['recent', 'shared', 'templates'].includes(v),
		},
		title: { type: String, required: true },
		description: { type: String, default: '' },
	},
}
</script>

<style lang="scss" scoped>
.empty-illustration {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	padding: 32px 16px 8px;
	text-align: center;

	&__art {
		width: 220px;
		max-width: 80vw;
		margin-bottom: 8px;
		// Subtle entrance: float up + fade in.
		animation: empty-illustration-rise 360ms cubic-bezier(0.16, 1, 0.3, 1) backwards;

		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}

		svg {
			display: block;
			width: 100%;
			height: auto;
		}
	}

	&__halo {
		fill: var(--color-primary-element-light, var(--color-background-dark));
		// Use a tinted halo even when the brand variable isn't set.
		opacity: 0.85;
	}

	&__line {
		stroke: var(--color-primary-element, currentColor);
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
	&__paper {
		fill: var(--color-main-background);
	}
	&__faded {
		opacity: 0.5;
		stroke-width: 2;
	}
	&__dashed {
		stroke-dasharray: 3 3;
		opacity: 0.6;
		stroke-width: 2;
	}
	&__fill {
		fill: var(--color-primary-element, currentColor);
		opacity: 0.5;
		stroke: none;
	}
	&__badge {
		fill: var(--color-primary-element, currentColor);
		stroke: var(--color-main-background);
		stroke-width: 3;
	}
	&__badge-stroke {
		stroke: var(--color-primary-element-text, #fff);
		stroke-width: 2.5;
		stroke-linecap: round;
	}
	&__sparkles {
		fill: var(--color-primary-element, currentColor);
		opacity: 0.55;
		// Slow pulse keeps the page feeling alive without distracting.
		animation: empty-illustration-twinkle 4s ease-in-out infinite;

		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}
	}

	&__title {
		margin: 0;
		font-size: 1.15em;
		font-weight: 600;
		color: var(--color-main-text);
	}
	&__description {
		margin: 0;
		max-width: 36ch;
		color: var(--color-text-maxcontrast);
		font-size: 0.95em;
		line-height: 1.4;
	}
	&__action {
		margin-top: 12px;
	}
}

@keyframes empty-illustration-rise {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes empty-illustration-twinkle {
	0%, 100% { opacity: 0.55; }
	50% { opacity: 0.25; }
}
</style>
