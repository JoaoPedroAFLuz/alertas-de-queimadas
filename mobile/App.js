import { StatusBar } from 'react-native';
import { Routes } from './src/Routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Routes />
    </>
  );
}
