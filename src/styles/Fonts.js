const type = {
  light: 'Nunito-Light',
  regular: 'Nunito-Regular',
  bold: 'Nunito-SemiBold',
  lcd: 'DigitalPlaySt',
};

const size = {
  h1: 26,
  h2: 25,
  h3: 24,
  h4: 22,
  h5: 20,
  h6: 19,
  paragraph: 17,
  hint: 14,
};

const style = {
  h1: {
    fontFamily: type.bold,
    fontSize: size.h1,
  },
  h2: {
    fontFamily: type.bold,
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.bold,
    fontSize: size.h3,
  },
  h4: {
    fontFamily: type.bold,
    fontSize: size.h4,
  },
  h5: {
    fontFamily: type.bold,
    fontSize: size.h5,
  },
  h6: {
    fontFamily: type.bold,
    fontSize: size.h6,
  },
  normal: {
    fontFamily: type.regular,
    fontSize: size.h6,
  },
  paragraph: {
    fontFamily: type.regular,
    fontSize: size.paragraph,
  },
  input: {
    fontFamily: type.light,
    fontSize: size.medium,
  },
};

export default {
  type,
  size,
  style,
};
