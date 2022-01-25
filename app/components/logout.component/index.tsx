import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import {moduleName, signOut, userSelector} from "../../redux/modules/auth";
import {AsyncStorage, Text, View, StyleSheet} from "react-native";
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {COLORS} from "../../styles/colors";

interface IMapProps {
    user: any,
    loading: boolean,
    signOut: Function,
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

class LogOutComponent extends Component<IMapProps> {
    static defaultProps = {
        navigation: () => 1
    };

    private Menu: any = null;

    _signOutAsync = async() => {
        this.Menu.hide();
        await AsyncStorage.removeItem('access_token');
        this.props.signOut();
    };

    _onSelectAbout = () => {
        //this.props.navigation.navigate('Auth');
        this.Menu.hide();
    };

    componentDidUpdate(prevProps: Readonly<IMapProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.user === null) {
            this.props.navigation.navigate('AuthLoading');
        }
    }

    render() {
        return (
            <View style={localStyles.container}>
                <Menu
                    ref={(ref) => this.Menu = ref}
                    button={
                        <Text style={localStyles.avatar} onPress={() => this.Menu.show()}>
                            {
                                this.props.user ? (
                                    this.props.user.info.data.email.slice(0, 2).toUpperCase()
                                ) : null
                            }
                        </Text>
                    }
                >
                    {/*<MenuItem onPress={() => this._onSelectAbout()}>About User</MenuItem>*/}
                    {/*<MenuDivider/>*/}
                    <MenuItem style={localStyles.option} textStyle={localStyles.text} onPress={() => this._signOutAsync()}>Log Out</MenuItem>
                </Menu>
            </View>
        );
    }
}

const localStyles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: COLORS.PRIMARY,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        color: COLORS.SECONDARY
    },
    option: {
        backgroundColor: COLORS.BACKGROUND_DARK,
        borderRadius: 4,
        overflow: 'hidden',
    },
    text: {
        color: COLORS.TEXT_COLOR
    }
});

const mapStateToProps = (state: any) => ({
    user: userSelector(state),
    loading: state[moduleName].loading
});

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        signOut
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LogOutComponent);