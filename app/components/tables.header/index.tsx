import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Platform, Dimensions, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LogOutComponent from '../logout.component';
import {COLORS} from "../../styles/colors";
import {changeSettings, searchSelector} from "../../redux/modules/auth";
import {changeControls} from "../../redux/modules/map";

interface IMapProps {
    navigation: any,
    search: string,
    changeSettings: Function,
    changeControls: Function,
}

class TablesHeader extends Component<IMapProps> {

    private onChangeText = (value) => {
        this.props.changeSettings({
            name: 'search',
            value
        })
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={localStyles.container}>
                <View style={localStyles.header}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('MapScreen');
                        this.props.changeControls({
                            name: 'isTablesOpen',
                            value: false
                        })
                    }}>
                        <Icon name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} size={30} color={COLORS.TEXT_COLOR}/>
                    </TouchableOpacity>
                    <View style={localStyles.search}>
                        <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} size={30} color={COLORS.TEXT_COLOR}/>
                        <TextInput
                            style={localStyles.input}
                            placeholder={'Szukaj danych'}
                            placeholderTextColor={COLORS.TEXT_COLOR}
                            onChangeText={this.onChangeText}
                            value={this.props.search}
                        />
                    </View>
                    <LogOutComponent navigation={navigation}/>
                </View>
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 105,
        height: 60,
        width: Dimensions.get('window').width,
        backgroundColor: COLORS.BACKGROUND,
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
    },
    header: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    logotype: {
        width: 270,
        height: 35,
        resizeMode: 'stretch'
    },
    search: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 30,
    },
    input: {
        marginLeft: 5,
        flex: 1,
        height: 60,
    }
});

const mapStateToProps = (state: any) => ({
    search: searchSelector(state)
});

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        changeSettings,
        changeControls,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TablesHeader);