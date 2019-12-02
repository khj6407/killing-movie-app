import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CommonBtn from "./components/CommonBtn";
import { movies } from "./api/movies.js";

class App extends React.Component {
  //state : 변경되면 화면을 재시작한다.
  state = {
    viewPopular: null,
    loading: false
  };

  // render() 후 자동으로 실행되는 function
  componentDidMount = async () => {
    // async - await :: await이 완료될 때 까지 기다려!
    let popular, nowPlaying;

    //try - 실행해
    //catch(error)-만약 에러가 나면 니가 잡아줘
    //finally-정상구동하든 , 에러나든, 마지막에 나를 거쳐
    try {
      popular = await movies.getPopular();
      nowPlaying = await movies.getNowPlaying();
    } catch (error) {
      alert("영화 데이터를 가져오는데 실패!");
    } finally {
      popular = popular.data.results;

      this.setState({
        viewPopular: popular,
        loading: true
      });
    }
  };

  render() {
    const { viewPopular, loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.btnArea}>
          <CommonBtn>Popular</CommonBtn>
          <CommonBtn>NowPlaying</CommonBtn>
        </View>

        {/* loading이 트루라면? 앞에꺼 실행 : 아니면 뒤에거 */}
        {loading ? (
          viewPopular.map(movie => <Text>{movie.title}</Text>)
        ) : (
          <Text>loading...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50
  },
  btnArea: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "#34495e"
  }
});

export default App;
