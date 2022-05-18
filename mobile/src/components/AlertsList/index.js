import { useState, useEffect, useCallback } from 'react';

// eslint-disable-next-line import/no-unresolved
import { ALERTA_HUMANO_API, ALERTA_SATELITE_API } from '@env';

import { AlertCard } from '../AlertCard';
import {
  Container, ButtonContainer, TouchableOpacity, Text,
} from './styles';

export function AlertsList() {
  const [tipoAlerta, setTipoAlerta] = useState('humano');
  const [alertas, setAlertas] = useState([]);

  const carregarAlertas = useCallback(async () => {
    try {
      const url = tipoAlerta === 'humano'
        ? `${ALERTA_HUMANO_API}/alertas/humano`
        : `${ALERTA_SATELITE_API}/alertas/satelite`;

      const response = await fetch(url);
      const listaAlertas = await response.json();

      setAlertas(listaAlertas.map((alerta) => ({ ...alerta, tipoAlerta })));
    } catch (e) {
      console.error(e);
    }
  }, [tipoAlerta]);

  function handleTipoDeAlerta(tipo) {
    setTipoAlerta(tipo);
  }

  useEffect(() => {
    carregarAlertas();
  }, [carregarAlertas]);

  return (
    <Container>
      <ButtonContainer>
        <TouchableOpacity
          onPress={() => handleTipoDeAlerta('humano')}
          disabled={tipoAlerta === 'humano'}
        >
          <Text>Alertas humano</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTipoDeAlerta('satelite')}
          disabled={tipoAlerta === 'satelite'}
        >
          <Text>Alertas satelite</Text>
        </TouchableOpacity>
      </ButtonContainer>

      {alertas.map((alerta) => (
        <AlertCard key={alerta['_id']} alerta={alerta} />
      ))}
    </Container>
  );
}
