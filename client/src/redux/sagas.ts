import { takeEvery, call } from "redux-saga/effects";
import { toaster } from "evergreen-ui";
import {
  login as customerloginthunk,
  updateProfile as updateProfileThunk,
} from "./customerSlice";
import { login as adminloginthunk, refreshEmbedUrl } from "./adminSlice";

function* handleThunkFailed(action: any) {
  yield call(toaster.danger, action.payload);
}

function* handleUpdateProfileSuccess(action: any) {
  yield call(toaster.success, "Your profile was updated successfully");
}

function* watchThunks() {
  yield takeEvery(customerloginthunk.rejected, handleThunkFailed);
  yield takeEvery(adminloginthunk.rejected, handleThunkFailed);
  yield takeEvery(updateProfileThunk.rejected, handleThunkFailed);
  yield takeEvery(refreshEmbedUrl.rejected, handleThunkFailed);
  yield takeEvery(updateProfileThunk.fulfilled, handleUpdateProfileSuccess);
}

export default function* userSaga() {
  yield watchThunks();
}
