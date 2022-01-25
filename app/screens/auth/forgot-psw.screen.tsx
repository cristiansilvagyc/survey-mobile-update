import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import {ActivityIndicator, Dimensions, StyleSheet, Text, View} from "react-native";
import {Image} from 'react-native-elements';
import {Form, Field} from 'react-native-validate-form';
import {TextField} from 'react-native-material-textfield';
import {email, required} from "../../utils/validators";
import {PrimaryButton} from "../../components/buttons/primary.button";
import {changeSettings, reqResetPsw, moduleName, userSelector} from "../../redux/modules/auth";
import {COLORS} from "../../styles/colors";

interface IMapProps {
    reqResetPsw: any,
    refreshed: any,
    user: any,
    loading: boolean,
    authError: any,
    changeSettings: Function,
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface IMapState {
    email: string,
    formErrors: any,
    fieldError: any,
}

class ForgotPswScreen extends Component<IMapProps, IMapState> {
    static navigationOptions = {
        header:
            <View style={{
                position: 'absolute',
                top: 45,
                height: 60,
                width: Dimensions.get('window').width - 20,
                backgroundColor: COLORS.BACKGROUND,
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Image
                    style={{height: 35, width: 0}}
                    source={require('../../../assets/images/logo.png')}
                />
            </View>
    };

    private ResetPswForm: any;

    state = {
        email: '',
        formErrors: [],
        fieldError: {}
    };

    componentDidMount(): void {
        this.props.changeSettings({});
    }

    componentWillReceiveProps(nextProps: Readonly<IMapProps>, nextContext: any): void {
        if(nextProps.user !== this.props.user) {
            this.props.navigation.navigate('App');
        }
        if(nextProps.refreshed !== this.props.refreshed) {
            this.props.navigation.navigate('SignIn');
        }
    }

    private onBack = () => {
        this.props.navigation.navigate('SignIn');
    };

    private submitForm = async () => {
        let result = this.ResetPswForm.validate();
        let formErrors = [];
        const fieldError = {};

        result.map((field) => {
            formErrors.push({name: field.fieldName, error: field.error});
        });

        formErrors.forEach((field) => {
            fieldError[field.name] = field.error;
        });

        this.setState({
            formErrors,
            fieldError
        });
    };

    private onChange = (state) => {
        this.props.changeSettings({});
        this.setState({
            ...state,
            errors: []
        })
    };

    render() {
        const {authError} = this.props;
        return (
            <View style={localStyles.container}>
                <Text style={localStyles.title}>Reset Password</Text>
                <Form
                    style={localStyles.form}
                    ref={(ref) => this.ResetPswForm = ref}
                    validate={true}
                    submit={() => this.props.reqResetPsw(this.state)}
                    errors={this.state.formErrors}
                >
                    <Field
                        customStyle={localStyles.field}
                        requered
                        label={'Email'}
                        placeholder='Wpisz email'
                        component={TextField}
                        validation={[required, email]}
                        error={this.state.fieldError['email']}
                        name='email'
                        value={this.state.email}
                        onChangeText={(email) => this.onChange({email})}
                        baseColor={COLORS.TEXT_COLOR}
                        textColor={COLORS.TEXT_COLOR}
                    />
                </Form>
                <PrimaryButton
                    variant={'secondary'}
                    style={localStyles.link}
                    title={'Powrót do logowania'}
                    onPress={this.onBack}
                />
                <PrimaryButton
                    style={localStyles.controls}
                    title={'Zresetuj hasło!'}
                    disabled={this.props.loading}
                    onPress={this.submitForm}
                />
                {
                    authError ? (
                        <Text style={{color: 'red'}}>
                            Error! Email is wrong. Please try again
                        </Text>
                    ) : null
                }
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.BACKGROUND
    },
    title: {
        marginTop: 130,
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.TEXT_COLOR
    },
    form: {
        width: Dimensions.get('window').width - 20,
        paddingTop: 20,
    },
    field: {
        width: '100%',
        marginTop: 20,
    },
    link: {
        display: 'flex',
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 20,
        marginBottom: 40,
        height: 20,
        maxWidth: 150,
    },
    controls: {
        width: Dimensions.get('window').width - 20,
    }
});

const mapStateToProps = (state: any) => ({
    refreshed: state[moduleName].refreshed,
    user: userSelector(state),
    authError: state[moduleName].error,
    loading: state[moduleName].loading
});

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        changeSettings,
        reqResetPsw,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPswScreen);
// export default ForgotPswScreen;