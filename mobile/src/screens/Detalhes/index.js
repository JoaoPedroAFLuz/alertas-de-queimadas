import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

// eslint-disable-next-line import/no-unresolved
import { ALERTA_HUMANO_API, ALERTA_SATELITE_API } from '@env';

import {
  Container,
  Alert,
  Description,
  Info,
  Title,
  Key,
  Value,
} from './styles';

export function Detalhes({ route }) {
  const [alerta, setAlerta] = useState([]);
  const [dataHora, setDataHora] = useState('');

  const { alertaId, tipoAlerta } = route.params;

  const carregarAlertas = useCallback(async () => {
    try {
      const url = tipoAlerta === 'humano'
        ? `${ALERTA_HUMANO_API}/alertas/humano/${alertaId}`
        : `${ALERTA_SATELITE_API}/alertas/satelite/${alertaId}`;

      const response = await fetch(url);
      const alertaAPI = await response.json();

      const data = tipoAlerta === 'humano'
        ? moment(alertaAPI.dataHora).format('DD/MM/YYYY HH:mm:ss')
        : moment(alertaAPI.datahora?.['$date']).format('DD/MM/YYYY HH:mm:ss');

      setDataHora(data);

      setAlerta(alertaAPI);
    } catch (e) {
      console.error(e);
    }
  }, [tipoAlerta]);

  useEffect(() => {
    carregarAlertas();
  }, [carregarAlertas]);

  return (
    <Container>
      <Alert>
        <Description>
          <Title>{`Alerta ${tipoAlerta}`}</Title>
          {tipoAlerta === 'humano' ? (
            <>
              <Info>
                <Key>Local:</Key>
                <Value>{alerta.local}</Value>
              </Info>
              <Info>
                <Key>Data e hora:</Key>
                <Value>{alerta.dataHora}</Value>
              </Info>
              <Info>
                <Key>Tipo do fogo:</Key>
                <Value>{alerta.tipo}</Value>
              </Info>
              <Info>
                <Key>Categoria:</Key>
                <Value>{alerta.categoria}</Value>
              </Info>
              <Info>
                <Key>Tempo presente:</Key>
                <Value>{alerta.tempo}</Value>
              </Info>
              <Info>
                <Key>Observações:</Key>
                <Value>{alerta.observacoes}</Value>
              </Info>
            </>
          ) : (
            <>
              <Info>
                <Key>Local:</Key>
                <Value>{`${alerta.municipio} - ${alerta.estado}`}</Value>
              </Info>
              <Info>
                <Key>Data e hora:</Key>
                <Value>{dataHora}</Value>
              </Info>
              <Info>
                <Key>Bioma:</Key>
                <Value>{alerta.bioma}</Value>
              </Info>
              <Info>
                <Key>Dias sem chuva:</Key>
                <Value>{alerta.diasemchuva}</Value>
              </Info>
              <Info>
                <Key>Precipitação:</Key>
                <Value>{alerta.precipitacao}</Value>
              </Info>
              <Info>
                <Key>Risco de fogo:</Key>
                <Value>{`${alerta.riscofogo * 10}%`}</Value>
              </Info>
              <Info>
                <Key>FRP:</Key>
                <Value>{alerta.frp}</Value>
              </Info>
            </>
          )}
        </Description>
      </Alert>
    </Container>
  );
}
