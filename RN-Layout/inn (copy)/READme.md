# INN 
## (Air b&b ui clone)
## 
This happens becouse the react-navigate use old version of SafeView.

_You have 2 ways:_

1. Long way: need to migrate to v5 react-navigation v4 to v5 migration.

For me its difficult and will take too much changes in my project.

2. Very fast and ugly solution:

Go to the dir YOUR_PROJECT_PATH/node_modules/react-native-safe-area-view/index.js and update:

from:

_**this.view._component.measureInWindow((winX, winY, winWidth, winHeight) => {**_

to:
_
**this.view.getNode().measureInWindow((winX, winY, winWidth, winHeight) => {**_
UPDATED: You can try my fork:

"react-navigation": "git://github.com/Snailapp/react-navigation.git#2.18.4",
"react-navigation": "git://github.com/Snailapp/react-navigation.git#2.18.5", --> fix warnings

_For me this happened when I upgraded Expo to SDK 38. To fix this; delete the line, "react-native-safe-area-view": "whatever version" from your package.json file. Then run expo install react-native-safe-area-view. Running this command when no version of that package exists upgrades your installed package to the latest compatible (with Expo) version._