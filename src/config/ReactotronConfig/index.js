import Reactotron, { openInEditor, trackGlobalErrors, asyncStorage } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';


if (__DEV__) {
  const tron = Reactotron.configure({
    name: 'ReactNativeTemplateGSR'
  })
    .use(asyncStorage())
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(reactotronRedux())
    .use(sagaPlugin())
    .connect();

  tron.clear();

  // eslint-disable-next-line no-console
  console.tron = tron;
}
