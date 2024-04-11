import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export type RootStackParamList = {
    Root: undefined;
    Modal: undefined;
    NotFound: undefined;
    Connect: { email: { textInputValue: string } } | undefined;
    App: { email: { textInputValue: string } } | NavigatorScreenParams<RootTabParamList> | undefined
    Login: undefined;
    ResetPassword: undefined;
    SignUp: undefined;
    Profile: undefined;
    Services: undefined;
    AreasInfo: undefined;
    OAuths: undefined;
    CreateArea: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;

export type RootTabParamList = {
    Home: undefined;
    Services: undefined
    Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;