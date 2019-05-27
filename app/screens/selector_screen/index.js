// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getCurrentTeamId} from 'xenia-redux/selectors/entities/teams';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';
import {getProfiles, searchProfiles} from 'xenia-redux/actions/users';
import {getChannels, searchChannels} from 'xenia-redux/actions/channels';

import SelectorScreen from './selector_screen';

function mapStateToProps(state) {
    const menuAction = state.views.post.selectedMenuAction || {};

    const data = menuAction.options || [];

    return {
        currentTeamId: getCurrentTeamId(state),
        data,
        dataSource: menuAction.dataSource,
        onSelect: menuAction.onSelect,
        theme: getTheme(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getProfiles,
            getChannels,
            searchProfiles,
            searchChannels,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectorScreen);
