// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {combineReducers} from 'redux';

import build from './build';
import version from './version';

export default combineReducers({
    build,
    version,
});
