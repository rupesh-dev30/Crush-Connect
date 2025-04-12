import { ImageSourcePropType } from 'react-native';

export type ImageSliderType = {
  image: ImageSourcePropType;
  title: string;
  description: string;
};

export const ImageSlider = [
  {
    title: 'Algorithm',
    description: 'Users go through a vetting process to ensure you never match with bots.',
    image: require('../assets/person/girl1.png'),
  },
  {
    title: 'Matches',
    description: 'We match you with people that have a large array of similar intrests.',
    image: require('../assets/person/girl2.png'),
  },
  {
    title: 'Smart Matching',
    description: 'Our system matches you with people that truly matter.',
    image: require('../assets/person/girl3.png'),
  },
];