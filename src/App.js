import React, {Component} from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  state = {
    apikey: "8437b363971849dea95b19598d4c8fcd",
    articles: [],
    userSearch: ''
  }

  userChange = (e) =>{
    this.setState({userSearch: e.target.value})
    // console.log(this.state.userSearch);
  }

  getArticles = () => {
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8437b363971849dea95b19598d4c8fcd&q=" + this.state.userSearch).then(response => {
      // console.log(response.data.response.docs);
      this.setState({articles: response.data.response.docs})
    })
  }

  render() {
    return (<div className="App">
      <h1>NEW YORK TIMES <br /> ARTICLE SEARCH</h1>

      <input type="text"
            onChange={this.userChange}
            value={this.state.userSearch}
            placeholder="search for..."
      />
      <br />
      <button onClick={this.getArticles} className="btn btn-primary m-3">Click for Articles</button>
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
