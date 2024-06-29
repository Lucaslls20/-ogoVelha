import React,{useState} from "react";
import { View,StyleSheet,TouchableOpacity,StatusBar,Text } from "react-native";

const App = () => {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);
    setJogadasRestantes(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setTela('jogo');
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);
    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');
    verificarGanhador(tabuleiro, linha, coluna);
  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    if (tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
      return finalizarJogo(tabuleiro[linha][0]);
    }
    if (tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      return finalizarJogo(tabuleiro[0][0]);
    }
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      return finalizarJogo(tabuleiro[0][2]);
    }
    if (jogadasRestantes - 1 === 0) {
      return finalizarJogo('');
    }
    setJogadasRestantes(jogadasRestantes - 1);
  }

  function finalizarJogo(jogador) {
    setGanhador(jogador);
    setTela('ganhador');
  }

  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text style={styles.title}>Menu</Text>
        <Text style={styles.subtitle}>Selecionar jogador</Text>
        <View style={styles.viewTouchable}>
          <TouchableOpacity style={styles.boxPlayer} onPress={() => iniciarJogo('X')}>
            <Text style={styles.playerX}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxPlayer} onPress={() => iniciarJogo('O')}>
            <Text style={styles.playerO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text>Jogo da Velha</Text>
        {tabuleiro.map((linha, numeroLinha) => {
          return (
            <View key={numeroLinha} style={styles.viewTouchable}>
              {linha.map((coluna, numeroColuna) => {
                return (
                  <TouchableOpacity
                    style={styles.boxPlayer}
                    key={numeroColuna}
                    onPress={() => jogar(numeroLinha, numeroColuna)}
                    disabled={coluna !== ''}
                  >
                    <Text style={coluna === 'X' ? styles.playerX : styles.playerO}>{coluna}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
        <TouchableOpacity style={styles.voltarMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textBotaoMenu}>Voltar para o Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text style={styles.title}>Jogo da Velha</Text>
        <Text style={styles.subtitle}>Ganhador</Text>
        {ganhador === '' && <Text style={styles.ganhador}>Nenhum Ganhador</Text>}
        {ganhador !== '' &&
          <View style={styles.viewGanhador}>
            <Text style={styles.ganhador}>Ganhador</Text>
            <Text style={ganhador === 'X' ? styles.playerX : styles.playerO}>{ganhador}</Text>
          </View>
        }
        <TouchableOpacity style={styles.voltarMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textBotaoMenu}>Voltar para o Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bed084',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333'
  },
  subtitle: {
    fontSize: 20,
    color: '#555',
    marginTop: 20
  },
  boxPlayer: {
    width: 80,
    height: 80,
    backgroundColor: '#e9e199',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  playerX: {
    color: '#553fda',
    fontSize: 40
  },
  playerO: {
    color: '#da3f3f',
    fontSize: 40
  },
  viewTouchable: {
    flexDirection: 'row',
  },
  voltarMenu: {
    marginTop: 20
  },
  textBotaoMenu: {
    color: '#4e6fe4'
  },
  ganhador: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  viewGanhador:{
    alignItems:'center'
  }
});

export default App;