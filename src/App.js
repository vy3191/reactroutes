import React, { Component } from 'react'
import Load from './components/load';
import Nav from './components/Nav';
import RepoGrid from './components/RepoGrid';

window.API = {
  fetchPopularRepos(language) {
    // "language" can be "javascript", "ruby", "python", or "all"
    const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
    return fetch(encodedURI)
      .then((data) => data.json())
      .then((repos) => repos.items)
      .catch((error) => {
        console.warn(error)
        return null
      });
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      links:[],
      load:false,
      activeLanguages:"all"
    }

    this.handleLanguage = this.handleLanguage.bind(this);
    this.fetchRepos = this.fetchRepos.bind(this);
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevState.activeLanguages !== this.state.activeLanguages) {
      this.fetchRepos(this.state.activeLanguages)
    }
  }

  componentDidMount() {
    this.fetchRepos(this.state.activeLanguages)
  }
  fetchRepos(lang) {
    this.setState({
      load:true
    })
    window.API.fetchPopularRepos(lang)
              .then( (data) => {
                 this.setState({
                    loading:false,
                    links:data
                 })
              })
              .catch( (err) => {
                  console.log(err);
              })
  }
  handleLanguage(lang) {
    this.setState({
      activeLanguages:lang
    })
  }
  render() {
   
    return (
      <div>
        <h1>What to know about the languages:</h1>
        <Nav changeLang={this.handleLanguage} />
        {this.state.loading === true
              ? <Load/>
              : <div>
                  <h1 style={{textAlign: 'center'}}>
                    {this.state.activeLanguages}
                  </h1>
                  <RepoGrid repos={this.state.links} />
                </div>}
        
      </div>
    )
  }
}

