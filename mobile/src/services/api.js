// eslint-disable-next-line import/no-unresolved
import { ALERTA_HUMANO_API, ALERTA_SATELITE_API } from '@env';

export default {
  async carregarAlertas(tipoAlerta, pagina, alertasPorPagina) {
    const url = tipoAlerta === 'humano'
      ? `${ALERTA_HUMANO_API}/alertas/humano?pagina=${pagina}&alertasPorPagina=${alertasPorPagina}`
      : `${ALERTA_SATELITE_API}/alertas/satelite?pagina=${pagina}&alertasPorPagina=${alertasPorPagina} `;

    const response = await fetch(url);
    const listaAlertas = await response.json();

    return listaAlertas.map((alerta) => ({ ...alerta, tipoAlerta }));
  },
};
