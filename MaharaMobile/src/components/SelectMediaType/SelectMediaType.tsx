import React from 'react';
import { View } from 'react-native';
import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import MediumButton from '../UI/MediumButton/MediumButton';
import { FILE, PHOTO, JOURNAL_ENTRY, AUDIO } from '../../utils/constants';

type Props = {
  selectMediaType: Function;
};

const SelectMediaType = (props: Props) => (
  <View>
    <MediumButton title={t`Add file`} onPress={() => props.selectMediaType(FILE)} />
    <MediumButton title={t`Take photo`} onPress={() => props.selectMediaType(PHOTO)} />
    <MediumButton title={t`Add journal entry`} onPress={() => props.selectMediaType(JOURNAL_ENTRY)} />
    <MediumButton title={t`Record audio`} onPress={() => props.selectMediaType(AUDIO)} />
  </View>
);

export default withI18n()(SelectMediaType);