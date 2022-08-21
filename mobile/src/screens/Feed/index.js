import { useEffect, useState } from 'react';

import api from '../../services/api';
import { CardAlerta } from '../../components/CardAlerta';
import { Loading } from '../../components/Loading';

import {
  ContainerBotao,
  TextoAlerta,
  Container,
  BotaoAlerta,
  FlatListAlertas,
} from './styles';
import { SearchBar } from '../../components/SearchBar';

export function Feed({ navigation }) {
  const [tipoAlerta, setTipoAlerta] = useState('humano');
  const [cidade, setCidade] = useState('');
  const [alertas, setAlertas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ultimaPagina, setUltimaPagina] = useState(false);

  const alertasPorPagina = 6;

  useEffect(() => {
    carregarAlertas();
  }, [tipoAlerta]);

  async function carregarAlertas() {
    if (isLoading || ultimaPagina) return;

    setIsLoading(true);

    const novosAlertas = await api.carregarAlertas(
      tipoAlerta,
      pagina,
      alertasPorPagina,
    );

    setUltimaPagina(novosAlertas.length === 0);
    setPagina((prevState) => prevState + 1);
    setAlertas((prevState) => [...prevState, ...novosAlertas]);

    setIsLoading(false);
  }

  async function carregarAlertasFiltrados() {
    if (isLoading) return;

    setIsLoading(true);

    const novosAlertas = await api.carregarAlertasFiltrados(
      tipoAlerta,
      pagina,
      alertasPorPagina,
      cidade,
    );

    setUltimaPagina(novosAlertas.length === 0);
    setPagina((prevState) => prevState + 1);
    setAlertas(novosAlertas);

    setIsLoading(false);
  }

  function handleTipoDeAlerta(tipo) {
    setPagina(1);
    setAlertas([]);
    setUltimaPagina(false);
    setTipoAlerta(tipo);
  }

  function renderizarAlerta(alerta) {
    function navigate() {
      navigation.navigate('Detalhes', {
        alertaId: alerta['_id'],
        tipoAlerta: alerta.tipoAlerta,
      });
    }

    return <CardAlerta alerta={alerta} onPress={() => navigate()} />;
  }

  return (
    <Container>
      <ContainerBotao>
        <BotaoAlerta
          onPress={() => handleTipoDeAlerta('humano')}
          disabled={tipoAlerta === 'humano'}
          title="Teste"
        >
          <TextoAlerta disabled={tipoAlerta === 'humano'}>
            Alertas humano
          </TextoAlerta>
        </BotaoAlerta>

        <BotaoAlerta
          onPress={() => handleTipoDeAlerta('satelite')}
          disabled={tipoAlerta === 'satelite'}
        >
          <TextoAlerta disabled={tipoAlerta === 'satelite'}>
            Alertas satélite
          </TextoAlerta>
        </BotaoAlerta>
      </ContainerBotao>

      <SearchBar setBusca={setCidade} onClick={() => carregarAlertasFiltrados()} />

      <FlatListAlertas
        data={alertas}
        keyExtractor={() => String(Math.random())}
        onEndReached={() => carregarAlertas()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<Loading loading={isLoading} />}
        renderItem={({ item }) => renderizarAlerta(item)}
      />
    </Container>
  );
}
