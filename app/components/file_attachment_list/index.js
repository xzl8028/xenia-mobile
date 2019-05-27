// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {canDownloadFilesOnMobile} from 'xenia-redux/selectors/entities/general';
import {makeGetFilesForPost} from 'xenia-redux/selectors/entities/files';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import {loadFilesForPostIfNecessary} from 'app/actions/views/channel';
import {getDimensions} from 'app/selectors/device';

import FileAttachmentList from './file_attachment_list';

function makeMapStateToProps() {
    const getFilesForPost = makeGetFilesForPost();
    return function mapStateToProps(state, ownProps) {
        return {
            ...getDimensions(state),
            canDownloadFiles: canDownloadFilesOnMobile(state),
            files: getFilesForPost(state, ownProps.postId),
            theme: getTheme(state),
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadFilesForPostIfNecessary,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(FileAttachmentList);
