import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

class MovieContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View key={this.props.id} style={styles.box}>
        <TouchableOpacity>
          <Text style={styles.title}>{this.props.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.vote}>◈ {this.props.vote}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.release}>{this.props.release}</Text>
        </TouchableOpacity>
        <Image
          style={styles.img}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${this.props.poster}`
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box: {
    margin: 10,
    backgroundColor: "#dff9fb",
    padding: 10,
    borderRadius: 15
  },
  title: {
    fontWeight: "bold",
    color: "#40407a"
  },
  vote: {
    color: "#535c68"
  },
  release: { color: "#6ab04c" },
  img: {
    marginLeft: 70,
    margin: 10,
    width: 120,
    height: 180
  }
});

export default MovieContainer;
