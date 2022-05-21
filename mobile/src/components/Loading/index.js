import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export function Loading({ loading }) {
  if (!loading) return null;

  return (
    <Container>
      <ActivityIndicator size={25} color="black" />
    </Container>
  );
}
