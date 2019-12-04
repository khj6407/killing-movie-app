import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import CommonBtn from "./components/CommonBtn";
import { movies } from "./api/movies.js";
import MovieContainer from "./components/MovieContainer";

const { width } = Dimensions.get("window");
class App extends React.Component {
  //state : 변경되면 화면을 재시작한다.
  state = {
    viewPopular: null,
    viewNowPlaying: null,
    popularBtn: false,
    nowPlayingBtn: false,
    loading: false
  };
  //redux:: state를 모든 js가 사용할 수 있게 만들어주는 기능 - 어려움
  //     :: 사용하고 싶은 곳에서만 전역변수가 된다.
  //context API :: state를 모든js가 API처럼 사용할 수 있게 만드는 기능 - 어려움

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
      nowPlaying = nowPlaying.data.results;

      this.setState({
        viewPopular: popular,
        viewNowPlaying: nowPlaying,
        loading: true
      });
    }
  };

  //onPress === onClick
  //onPressOut  === After click

  render() {
    const {
      viewPopular,
      loading,
      viewNowPlaying,
      popularBtn,
      nowPlayingBtn
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.btnArea}>
          {/* <CommonBtn action={() => this._clickPopularBtn}> */}
          <TouchableOpacity onPress={this._clickPopularBtn} style={styles.btn}>
            <Text style={styles.txt}>Popular</Text>
          </TouchableOpacity>
          {/* </CommonBtn> */}
          {/* <CommonBtn action={() => this._clickNowPlaying}>  */}
          <TouchableOpacity onPress={this._clickNowPlaying} style={styles.btn}>
            <Text style={styles.txt}>nowPlaying</Text>
          </TouchableOpacity>

          {/* </CommonBtn> */}
          {/* runtime Error ::버그 (눈에 보이지 않는 에러) */}
        </View>

        <ScrollView>
          {/* loading이 트루라면? 앞에꺼 실행 : 아니면 뒤에거 */}
          {popularBtn ? (
            loading ? (
              viewPopular.map(movie => (
                <MovieContainer
                  id={movie.id}
                  title={movie.title}
                  vote={movie.vote_average}
                  release={movie.release_date}
                  poster={movie.poster_path}
                />
              ))
            ) : (
              <Text>loading...</Text>
            )
          ) : null}

          {nowPlayingBtn ? (
            loading ? (
              viewNowPlaying.map(movie => (
                <MovieContainer
                  id={movie.id}
                  title={movie.title}
                  vote={movie.vote_average}
                  release={movie.release_date}
                  poster={movie.poster_path}
                />
              ))
            ) : (
              <Text>loading...</Text>
            )
          ) : null}
        </ScrollView>
      </View>
    );
  }

  //기능 구현
  _clickPopularBtn = () => {
    this.setState({
      popularBtn: true,
      nowPlayingBtn: false
    });
  };

  _clickNowPlaying = () => {
    this.setState({
      nowPlayingBtn: true,
      popularBtn: false
    });
  };
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
    borderBottomWidth: 2,
    paddingBottom: 10,
    borderBottomColor: "#34495e"
  },
  btn: {
    margin: 10,
    backgroundColor: "#22a6b3",
    padding: 8,
    width: width / 3,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,

    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5
  },
  txt: {
    color: "white",
    fontWeight: "bold"
  }
});

export default App;
