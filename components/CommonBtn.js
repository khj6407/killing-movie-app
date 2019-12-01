// 1. react를 시작한다.
import React from "react";

// 2. 필요한 컴포넌트를 react-native 에서 가져온다.
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// 3. 컴포넌트를 사용한다. class
class CommonBtn extends React.Component {
  //App.js 에서 호출할 때, props를 전달해줄 것을 예상하고 미리 받는 로직을 작성해둔다.
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.txt}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    margin: 10,
    backgroundColor: "blue",
    padding: 10,
    width: 160,
    borderTopLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  txt: {
    color: "white"
  }
});
// 4. 외부에서 사용할 수 있도록 export를 한다.
export default CommonBtn;
