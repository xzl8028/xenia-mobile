// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

let isToolTipVisible = false;

export function setToolTipVisible(visible = true) {
    isToolTipVisible = visible;
}

export function getToolTipVisible() {
    return isToolTipVisible;
}
