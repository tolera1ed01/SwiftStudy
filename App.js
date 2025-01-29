import { createStackNavigator } from "@react-navigation/stack";
import Appstack from './Stacks/Appstack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Appstack />
  );
}