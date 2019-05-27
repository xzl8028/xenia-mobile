// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getDimensions} from 'app/selectors/device';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';
import {canDownloadFilesOnMobile} from 'xenia-redux/selectors/entities/general';

import ImagePreview from './image_preview';

function mapStateToProps(state) {
    return {
        ...getDimensions(state),
        canDownloadFiles: canDownloadFilesOnMobile(state),
        theme: getTheme(state),
    };
}

export default connect(mapStateToProps)(ImagePreview);
