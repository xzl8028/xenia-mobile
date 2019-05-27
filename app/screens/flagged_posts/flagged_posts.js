// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {intlShape} from 'react-intl';
import {
    Keyboard,
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
} from 'react-native';

import {isDateLine, getDateForDateLine} from 'mattermost-redux/utils/post_list';

import ChannelLoader from 'app/components/channel_loader';
import DateHeader from 'app/components/post_list/date_header';
import FailedNetworkAction from 'app/components/failed_network_action';
import NoResults from 'app/components/no_results';
import PostSeparator from 'app/components/post_separator';
import StatusBar from 'app/components/status_bar';
import xeniaManaged from 'app/xenia_managed';
import SearchResultPost from 'app/screens/search/search_result_post';
import ChannelDisplayName from 'app/screens/search/channel_display_name';
import {changeOpacity} from 'app/utils/theme';

export default class FlaggedPosts extends PureComponent {
    static propTypes = {
        actions: PropTypes.shape({
            clearSearch: PropTypes.func.isRequired,
            loadChannelsByTeamName: PropTypes.func.isRequired,
            loadThreadIfNecessary: PropTypes.func.isRequired,
            getFlaggedPosts: PropTypes.func.isRequired,
            selectFocusedPostId: PropTypes.func.isRequired,
            selectPost: PropTypes.func.isRequired,
            showSearchModal: PropTypes.func.isRequired,
        }).isRequired,
        didFail: PropTypes.bool,
        isLoading: PropTypes.bool,
        navigator: PropTypes.object,
        postIds: PropTypes.array,
        theme: PropTypes.object.isRequired,
    };

    static defaultProps = {
        postIds: [],
    };

    static contextTypes = {
        intl: intlShape.isRequired,
    };

    constructor(props) {
        super(props);

        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        props.actions.clearSearch();
        props.actions.getFlaggedPosts();
    }

    goToThread = (post) => {
        const {actions, navigator, theme} = this.props;
        const channelId = post.channel_id;
        const rootId = (post.root_id || post.id);

        Keyboard.dismiss();
        actions.loadThreadIfNecessary(rootId);
        actions.selectPost(rootId);

        const options = {
            screen: 'Thread',
            animated: true,
            backButtonTitle: '',
            navigatorStyle: {
                navBarTextColor: theme.sidebarHeaderTextColor,
                navBarBackgroundColor: theme.sidebarHeaderBg,
                navBarButtonColor: theme.sidebarHeaderTextColor,
                screenBackgroundColor: theme.centerChannelBg,
            },
            passProps: {
                channelId,
                rootId,
            },
        };

        navigator.push(options);
    };

    handleClosePermalink = () => {
        const {actions} = this.props;
        actions.selectFocusedPostId('');
        this.showingPermalink = false;
    };

    handlePermalinkPress = (postId, teamName) => {
        this.props.actions.loadChannelsByTeamName(teamName);
        this.showPermalinkView(postId, true);
    };

    handleHashtagPress = async (hashtag) => {
        const {actions, navigator} = this.props;

        await navigator.dismissModal();

        actions.showSearchModal(navigator, '#' + hashtag);
    };

    keyExtractor = (item) => item;

    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'close-settings') {
                this.props.navigator.dismissModal({
                    animationType: 'slide-down',
                });
            }
        }
    };

    previewPost = (post) => {
        Keyboard.dismiss();

        this.showPermalinkView(post.id, false);
    };

    renderEmpty = () => {
        const {formatMessage} = this.context.intl;
        const {theme} = this.props;

        return (
            <NoResults
                description={formatMessage({
                    id: 'mobile.flagged_posts.empty_description',
                    defaultMessage: 'Flags are a way to mark messages for follow up. Your flags are personal, and cannot be seen by other users.',
                })}
                iconName='ios-flag'
                title={formatMessage({id: 'mobile.flagged_posts.empty_title', defaultMessage: 'No Flagged Posts'})}
                theme={theme}
            />
        );
    };

    renderPost = ({item, index}) => {
        const {postIds, theme} = this.props;

        if (isDateLine(item)) {
            return (
                <DateHeader
                    date={getDateForDateLine(item)}
                    index={index}
                />
            );
        }

        let separator;
        const nextPost = postIds[index + 1];
        if (nextPost && !isDateLine(nextPost)) {
            separator = <PostSeparator theme={theme}/>;
        }

        return (
            <View>
                <ChannelDisplayName postId={item}/>
                <SearchResultPost
                    postId={item}
                    previewPost={this.previewPost}
                    highlightPinnedOrFlagged={false}
                    goToThread={this.goToThread}
                    navigator={this.props.navigator}
                    onHashtagPress={this.handleHashtagPress}
                    onPermalinkPress={this.handlePermalinkPress}
                    managedConfig={xeniaManaged.getCachedConfig()}
                    showFullDate={false}
                    skipFlaggedHeader={true}
                    skipPinnedHeader={true}
                />
                {separator}
            </View>
        );
    };

    showPermalinkView = (postId, isPermalink) => {
        const {actions, navigator} = this.props;

        actions.selectFocusedPostId(postId);

        if (!this.showingPermalink) {
            const options = {
                screen: 'Permalink',
                animationType: 'none',
                backButtonTitle: '',
                overrideBackPress: true,
                navigatorStyle: {
                    navBarHidden: true,
                    screenBackgroundColor: changeOpacity('#000', 0.2),
                    modalPresentationStyle: 'overCurrentContext',
                },
                passProps: {
                    isPermalink,
                    onClose: this.handleClosePermalink,
                },
            };

            this.showingPermalink = true;
            navigator.showModal(options);
        }
    };

    retry = () => {
        this.props.actions.getFlaggedPosts();
    };

    render() {
        const {didFail, isLoading, postIds, theme} = this.props;

        let component;
        if (didFail) {
            component = (
                <FailedNetworkAction
                    onRetry={this.retry}
                    theme={theme}
                />
            );
        } else if (isLoading) {
            component = (
                <ChannelLoader channelIsLoading={true}/>
            );
        } else if (postIds.length) {
            component = (
                <FlatList
                    ref='list'
                    contentContainerStyle={style.sectionList}
                    data={postIds}
                    keyExtractor={this.keyExtractor}
                    keyboardShouldPersistTaps='always'
                    keyboardDismissMode='interactive'
                    renderItem={this.renderPost}
                />
            );
        } else {
            component = this.renderEmpty();
        }

        return (
            <SafeAreaView style={style.container}>
                <View style={style.container}>
                    <StatusBar/>
                    {component}
                </View>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});
