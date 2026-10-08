/**
 * SPDX-FileCopyrightText: 2013 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { autoSetupBuiltInCodeServerIfNeeded } from './services/builtInCode.ts'

import './init-shared.js'
import '../css/filetypes.scss'

autoSetupBuiltInCodeServerIfNeeded()
