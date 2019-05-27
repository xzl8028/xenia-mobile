// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getAutolinkedUrlSchemes, getConfig} from 'xenia-redux/selectors/entities/general';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';
import {getCurrentUserMentionKeys} from 'xenia-redux/selectors/entities/users';

import Markdown from './markdown';

function mapStateToProps(state) {
    const {MinimumHashtagLength} = getConfig(state);

    return {
        autolinkedUrlSchemes: getAutolinkedUrlSchemes(state),
        mentionKeys: getCurrentUserMentionKeys(state),
        minimumHashtagLength: MinimumHashtagLength ? parseInt(MinimumHashtagLength, 10) : 3,
        theme: getTheme(state),
    };
}

export default connect(mapStateToProps)(Markdown);
