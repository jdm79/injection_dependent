import React from "react";
import { StyleSheet, View, Button } from "react-native";
import moment from "moment";
import CurrentSite from "../components/CurrentSite";
import PreviousSite from "../components/PreviousSite";
import Header from "../components/Header";
import injectionsites from "../components/injectionsites";
import BodyImages from "../components/BodyImages";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: injectionsites,
      history: [
        { site: injectionsites[injectionsites.length - 1], time: moment() }
      ]
    };
  }

  onSwipeRight(gestureState) {
    this.handleSkip();
  }

  handleConfirmation() {
    this.setState(prevState => ({
      history: prevState.history.concat({
        site: prevState.sites[0],
        time: moment()
      })
    }));
    this.nextSite();
    alert("Confirmed");
  }

  handleSkip() {
    this.nextSite();
  }

  nextSite() {
    this.setState(prevState => ({
      sites: prevState.sites.slice(1).concat(prevState.sites[0])
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Header />
          <GestureRecognizer onSwipeRight={state => this.onSwipeRight(state)}>
            <BodyImages imgNum={this.state.sites[0].imgNum} />
          </GestureRecognizer>
          <CurrentSite id="currentSite" site={this.state.sites[0]} />
          <PreviousSite
            id="previousSite"
            site={this.state.history[this.state.history.length - 1].site.part}
            time={this.state.history[this.state.history.length - 1].time}
          />
        </View>
        <View
          style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={event => {
              this.handleConfirmation();
            }}
            id="confirm"
            title="Confirm"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flexDirection: "row"
  },
  image: {
    width: 110,
    height: 200,
    padding: 10,
    alignSelf: "center"
  }
});
