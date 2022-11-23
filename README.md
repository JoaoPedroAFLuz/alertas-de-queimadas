# Aplicativo móvel e microsserviços para emissão e consulta de alertas sobre queimadas

## Requisitos
- GIT;
- Docker;
- Expo Go (instalado no telefone) ou um emulador Android ou iOS;

## Como instalar
- Clone o projeto com o comando:
```
git clone https://github.com/JoaoPedroLuz57/alertas-de-queimadas.git
```
- Instale a dependência dos microsserviços e do aplicativo móvel com o comando (este comando deve ser executado na raiz das pastas dos microsserviços 
e na do aplicativo móvel):
```
npm install
```
- Dê um docker compose up no arquivo ./server/docker-compose.yml
- Execute o aplicativo móvel com o comando:
```
expo start
```
- Escanei o QR Code ou abra pelo emulador seguindo os passos descritos no terminal.
