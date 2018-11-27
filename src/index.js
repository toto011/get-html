import React, { Component } from 'react';
import { render } from "react-dom";
import cheerio from "cheerio";
import renderHTML from "react-render-html";
class App extends Component {
  state = {
    data: [],
    logos: []
  };

  componentDidMount() {
    this.getDataFromApi();
  }

  getDataFromApi = () => {
    fetch("https://facebook.github.io/react-native/")
    .then(response => response.text())
    .then(data => {
      const $ = cheerio.load(data);
      this.setState({ logos: $(".logos").html() });
    })
    .catch(error => {
      this.setState({ error: error });
    });
  }

  render () {
    const thisLogosWithImages = String(this.state.logos).replace(new RegExp('/react-native', 'g'), 'https://facebook.github.io/react-native');
    return <div className="App">{renderHTML(String(thisLogosWithImages))}</div>;
  }
}

render(<App />, document.getElementById("root"));

export default App;