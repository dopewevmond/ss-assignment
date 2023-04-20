import { takeEvery, call } from "redux-saga/effects";
import { toaster } from "evergreen-ui";
import {
  login as loginthunk,
  signup as signupthunk,
  refreshEmbedUrl as refreshThunk,
  updateProfile as updateProfileThunk,
} from "./userSlice";

function* handleThunkFailed(action: any) {
  yield call(toaster.danger, action.payload);
}

function* handleUpdateProfileSuccess(action: any) {
  yield call(toaster.success, 'Your profile was updated successfully')
}

function* watchThunks() {
  yield takeEvery(loginthunk.rejected, handleThunkFailed);
  yield takeEvery(signupthunk.rejected, handleThunkFailed);
  yield takeEvery(refreshThunk.rejected, handleThunkFailed);
  yield takeEvery(updateProfileThunk.fulfilled, handleUpdateProfileSuccess);
}

export default function* userSaga() {
  yield watchThunks();
}
