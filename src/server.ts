import { app } from './app';
import SETTINGS from './utils/constants/settings';

app.listen(SETTINGS.PORT, () => {
  console.log(`listen on ${SETTINGS.PORT} port`);
});
