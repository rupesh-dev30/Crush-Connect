// constants.ts
import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const SPACING = 16;
export const ITEM_WIDTH = SCREEN_WIDTH * 0.75;
export const SIDE_SPACE = (SCREEN_WIDTH - ITEM_WIDTH) / 2;
