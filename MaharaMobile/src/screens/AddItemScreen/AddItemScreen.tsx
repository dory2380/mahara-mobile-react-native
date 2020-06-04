import {I18n} from '@lingui/core';
import {t, Trans} from '@lingui/macro';
import {withI18n} from '@lingui/react';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import buttons from '../../assets/styles/buttons';
import generic from '../../assets/styles/generic';
import AddAudio from '../../components/AddAudio/AddAudio';
import CustomVerifyBackButton from '../../components/UI/CustomVerifyBackButton/CustomVerifyBackButton';
import OutlineButton from '../../components/UI/OutlineButton/OutlineButton';
import outlineButtonStyles from '../../components/UI/OutlineButton/OutlineButton.style';
import UploadForm from '../../components/UploadForm/UploadForm';
import {
  MaharaFile,
  MaharaPendingFile,
  UserBlog,
  UserFolder,
  UserTag
} from '../../models/models';
import {
  selectDefaultBlogId,
  selectDefaultFolderTitle,
  selectToken,
  selectUrl
} from '../../reducers/loginInfoReducer';
import {RootState} from '../../reducers/rootReducer';
import {selectAllUploadFiles} from '../../reducers/uploadFilesReducer';
import {selectAllJEntries} from '../../reducers/uploadJEntriesReducer';
import {
  selectUserBlogs,
  selectUserFolders
} from '../../reducers/userArtefactsReducer';
import {selectUserTags} from '../../reducers/userTagsReducer';
import {
  pickDocument,
  renderImagePreview,
  takePhoto
} from '../../utils/addEditHelperFunctions';
import {AUDIO, FILE, PHOTO} from '../../utils/constants';
import i18n from '../../i18n';

type Props = {
  userFolders: Array<UserFolder>;
  userTags: Array<UserTag>;
  userName: string;
  token: string;
  dispatch: Dispatch;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  url: string;
  uploadList: {
    files: Array<MaharaPendingFile>;
  };
  formType: string;
  userBlogs: Array<UserBlog>;
  i18n: I18n;
  defaultFolderTitle: string;
  defaultBlogId: number;
};

const AddItemScreen = (props: Props) => {
  const initialPickedFileState: MaharaFile = {
    name: '',
    size: 0,
    type: '',
    uri: ''
  };

  // State
  const formType = props.navigation.getParam('formType');
  const [pickedFile, setPickedFile] = useState(initialPickedFileState);

  return (
    <ScrollView>
      <View style={generic.wrap}>
        {/* select a file button */}
        {pickedFile.name && (formType === FILE || formType === PHOTO)
          ? renderImagePreview(pickedFile.uri)
          : null}
        {formType === FILE && (
          <View>
            {/* title={props.i18n._(t`${getRecordStrings(recordButtonStatus)}`)} */}

            <OutlineButton
              text={
                pickedFile.uri === ''
                  ? t`Select a file`
                  : t`Select a different file`
              }
              onPress={() => pickDocument(setPickedFile)}
              style={null}
              icon="faFolderOpen"
            />
          </View>
        )}
        {/* take a photo button */}
        {formType === PHOTO && (
          <TouchableOpacity
            onPress={() => takePhoto(setPickedFile)}
            accessibilityRole="button">
            <Text style={[buttons.md, outlineButtonStyles.buttons]}>
              <FontAwesome5 name="camera" size={20} />
              &nbsp; {pickedFile.uri === '' && <Trans>Take photo</Trans>}
              {pickedFile.uri && <Trans>Re-take photo</Trans>}
            </Text>
          </TouchableOpacity>
        )}
        {/* record audio button */}
        {formType === AUDIO && (
          <View>
            <AddAudio setPickedFile={setPickedFile} />
          </View>
        )}
        <View>
          <UploadForm
            pickedFile={pickedFile}
            userFolders={props.userFolders}
            userTags={props.userTags}
            userBlogs={props.userBlogs}
            formType={formType}
            token={props.token}
            url={props.url}
            editItem={null}
            navigation={props.navigation}
            defaultFolderTitle={props.defaultFolderTitle}
            defaultBlogId={props.defaultBlogId}
          />
        </View>
      </View>
    </ScrollView>
  );
};

AddItemScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: i18n._(t`Add ${navigation.getParam('formType')}`),
    headerLeft: <CustomVerifyBackButton navigation={navigation} />
  };
};

const mapStateToProps = (state: RootState) => ({
  url: selectUrl(state),
  token: selectToken(state),
  userTags: selectUserTags(state),
  userFolders: selectUserFolders(state),
  userBlogs: selectUserBlogs(state),
  uploadJournals: selectAllJEntries(state),
  uploadFiles: selectAllUploadFiles(state),
  defaultFolderTitle: selectDefaultFolderTitle(state),
  defaultBlogId: selectDefaultBlogId(state)
});

export default connect(mapStateToProps)(withI18n()(AddItemScreen));
