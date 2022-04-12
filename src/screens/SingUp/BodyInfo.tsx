import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import SwiperUnits from '../../lib/swiperUnits';
import { AppStyles, Colors, Fonts } from '../../styles';
import { updateUserField } from '../../store/singup/singupSlice';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppDispatch } from '../../hooks';
import { Button } from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Singup/BodyInfo'>;

const BodyInfoScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();

  const onUpdateField = (
    field: 'weight' | 'gender' | 'height',
    value: number | string,
  ) => {
    dispatch(updateUserField({ field, value }));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.bodyScreenContent}>
        <SwiperUnits
          title={translate('weight')}
          titleStyles={styles.titleWeight}
          range={[20, 129]} // TODO cambiar de acuerdo a escala
          unitStyles={styles.weightUnit}
          activeUnitStyles={styles.activeWeightUnit}
          magnitudeSyles={styles.magnitude}
          onActiveItem={activeItem => {
            onUpdateField('weight', activeItem);
          }}
        />
        <View style={styles.section}>
          <Button title={translate('button.next')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  titleWeight: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    color: Colors.paragraph,
  },
  weightUnit: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    color: Colors.paragraph,
    textAlign: 'center',
  },
  activeWeightUnit: {
    color: Colors.headline,
  },
  magnitude: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
    color: Colors.paragraph,
    textAlign: 'center',
  },
  bodyScreenContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default BodyInfoScreen;
