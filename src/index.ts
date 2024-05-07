import { app } from "./app";
import { SETTINGS } from "./seting/seting";






app.listen(SETTINGS.PORT, () => {
  console.log(`server  and  start`);
});
