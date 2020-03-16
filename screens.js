
import FirstScreenTab from './firstTabScreen';
import SecondTab from './secondTab';
import HistoryTab from './historyTab';
import App from  './App';
import LightBox from  './lightBox'
import NewEarn from  './newEarn';
import Analyse from  './Analyse';
import { Navigation } from 'react-native-navigation';


// register all screens of the app (including internal ones)
export function registerScreens() {
    Navigation.registerComponent('SecondTab', () => SecondTab);
    Navigation.registerComponent('FirstTabScreen', () => FirstScreenTab);
    Navigation.registerComponent('HistoryTab', () => HistoryTab);
    Navigation.registerComponent('LightBox', () => LightBox);
    Navigation.registerComponent('NewEarn', () => NewEarn);
    Navigation.registerComponent('Analyse', () => Analyse);
    Navigation.registerComponent('App', () => App);


}