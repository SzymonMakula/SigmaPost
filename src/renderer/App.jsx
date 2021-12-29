import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import PostForm from './components/MainScreen';
import CustomThemeProvider from './styles/themeProvider';
import GlobalStyle from './styles/globalStyles';
import SettingsScreen from './components/SettingsScreen/SettingsScreen';
import ConfigProvider from './context/config';

function Main() {
  return (
      <PostForm />
  );
}

export default function App() {
  return (
  <ConfigProvider>
    <CustomThemeProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/settings" component={SettingsScreen} />
        </Switch>
      </Router>
    <GlobalStyle />
    </CustomThemeProvider>
  </ConfigProvider>
  );
}
