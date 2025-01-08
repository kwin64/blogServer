import { app } from './app';
import settings from './utils/constants/settings';

app.listen(settings.PORT, () => {
  console.log(`listen on ${settings.PORT} port`);
});
