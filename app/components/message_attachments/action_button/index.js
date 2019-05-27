// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {doPostAction} from 'xenia-redux/actions/posts';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import ActionButton from './action_button';

function mapStateToProps(state) {
    return {
        theme: getTheme(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            doPostAction,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
