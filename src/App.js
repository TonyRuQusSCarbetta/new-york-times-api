import React, {Component} from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  state = {
    apikey: "8437b363971849dea95b19598d4c8fcd",
    articles: []
  }

  getArticles = () => {
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8437b363971849dea95b19598d4c8fcd&q=bacon").then(response => {
      console.log(response.data.response.docs);
      this.setState({articles: response.data.response.docs})
    })
  }

  render() {
    return (<div className="App">
      <h1>NY TIMES SEARCH</h1>
      <button onClick={this.getArticles} className="btn btn-primary">Click for Articles</button>
      {
        this.state.articles.map((article, idx) => {
          return (<div key={idx}>
            <p>{article.snippet}</p>
            <a href={article.web_url} target="_blank">Link</a>
          </div>);
        })
      }

    </div>);
  }
}

export default App;
