// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getOpenGraphMetadata} from 'xenia-redux/actions/posts';

import {getDimensions} from 'app/selectors/device';

import PostAttachmentOpenGraph from './post_attachment_opengraph';

function mapStateToProps(state) {
    return {
        ...getDimensions(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getOpenGraphMetadata,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAttachmentOpenGraph);
