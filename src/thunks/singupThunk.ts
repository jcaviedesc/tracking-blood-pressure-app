import type { SaveUserPayload } from './types';
import { AxiosError } from 'axios';
import { userToApi } from '../services/user.transform';
import { selectUser, clear } from '../store/singup/singupSlice';
import firebaseStoreService from '../services/FirebaseStore';
import { updateUserProfileFromSingup } from '../store/user/userSlice';
import { snakeCaseToCamelCase } from '../services/utils';
import { setScreenLoading } from '../store/app/appSlice';
import type {
  AppDispatch,
  AppGetState,
  ClientApi,
} from '../store/configureStore';
import { RegisterUser } from '../services/api/types';
import { userFromApi } from '../store/user/types';

export const saveUser = ({ navigation, authProviderId }: SaveUserPayload) => {
  return async function saveUserThunk(
    dispatch: AppDispatch,
    getState: AppGetState,
    client: ClientApi,
  ) {
    dispatch(setScreenLoading(true));
    const user = selectUser(getState());
    const { picture } = user;

    let profile_url = '';
    if (picture.uri !== '') {
      const photoURL = await firebaseStoreService(
        `profile-pic.${picture.type?.split('/')[1]}`,
        picture.uri,
        `users/${authProviderId}/images`,
      );
      profile_url = photoURL;
    }
    const userTransformed = userToApi({ ...user, profile_url }) as RegisterUser;

    const response = await client
      .registerUser(userTransformed)
      .catch((error: AxiosError) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
        return { status: error.response?.status, data: error.response?.data };
      });
    if (response.status === 201) {
      console.log(response);
      dispatch(clear());
      const transformUser = snakeCaseToCamelCase(response.data) as userFromApi;
      dispatch(updateUserProfileFromSingup(transformUser));
      navigation.navigate('Home');
    }
    dispatch(setScreenLoading(false));
  };
};
