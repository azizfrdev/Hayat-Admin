import {
    defaultLightTheme,
    defaultDarkTheme,
    radiantDarkTheme,
    radiantLightTheme,
    houseDarkTheme,
    houseLightTheme,
} from 'react-admin';

import { chiptuneTheme } from './chiptuneTheme';

export const themes = [
    { name: 'default', light: defaultLightTheme, dark: defaultDarkTheme },
    { name: 'radiant', light: radiantLightTheme, dark: radiantDarkTheme },
    { name: 'house', light: houseLightTheme, dark: houseDarkTheme },
    { name: 'chiptune', light: chiptuneTheme },
];
