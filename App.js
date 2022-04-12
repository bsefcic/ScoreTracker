// This is the first file that ReactNative will run when it starts up.
import App from "./app/app.tsx"
import { registerRootComponent } from "expo"
import Amplify, { Auth } from "aws-amplify"
import awsconfig from "./aws-exports.js"
import { withAuthenticator } from 'aws-amplify-react-native'

Amplify.configure(awsconfig)
registerRootComponent(App)
export default withAuthenticator(App)
