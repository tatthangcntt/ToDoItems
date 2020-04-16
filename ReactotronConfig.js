import Reactotron from 'reactotron-react-native'

Reactotron
  // .configure({host: '192.168.77.4'}) // controls connection & communication settings
  .configure()
  //.configure({host: '192.168.100.21'}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect()