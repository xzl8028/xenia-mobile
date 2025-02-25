// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {intlShape} from 'react-intl';
import {
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

import {changeOpacity, makeStyleSheetFromTheme} from 'app/utils/theme';

export default class TeamButton extends PureComponent {
    static propTypes = {
        team: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    static contextTypes = {
        intl: intlShape,
    };

    render() {
        const {formatMessage} = this.context.intl;
        const {onPress, team, theme} = this.props;
        const teamName = team ? team.display_name : '';
        const styles = getStyleSheet(theme);

        return (
            <TouchableHighlight
                onPress={onPress}
                style={styles.buttonContainer}
                underlayColor={changeOpacity(theme.centerChannelColor, 0.2)}
            >
                <View style={styles.buttonWrapper}>
                    <Text style={styles.buttonLabel}>
                        {formatMessage({id: 'mobile.share_extension.team', defaultMessage: 'Team'})}
                    </Text>
                    <Text style={styles.buttonValue}>
                        {teamName}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const getStyleSheet = makeStyleSheetFromTheme((theme) => {
    return {
        flex: {
            flex: 1,
        },
        buttonContainer: {
            borderTopColor: changeOpacity(theme.centerChannelColor, 0.2),
            borderTopWidth: 1,
            height: 70,
            paddingHorizontal: 15,
        },
        buttonWrapper: {
            alignItems: 'flex-start',
            flex: 1,
        },
        buttonLabel: {
            fontSize: 16,
            marginTop: 16,
            marginBottom: 3,
        },
        buttonValue: {
            color: changeOpacity(theme.centerChannelColor, 0.6),
            fontSize: 14,
        },
    };
});
