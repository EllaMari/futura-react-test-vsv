import React from 'react'
import logo from './logo.svg';
import './App.css';

const ALLCATEGORIESURL = 'https://api.chucknorris.io/jokes/categories'
const RANDOMJOKEBYCATURL = 'https://api.chucknorris.io/jokes/random?category=' // remember to fill this
const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' // remember to fill this
const launchErrorAlert = () => setTimeout(() => window.alert('errore!'), 500) 

// classe 'App-logo-spinning' durante il caricamento, altrimenti classe 'App-logo'
const Logo = ({ loading }) => {
  return (
    <img
      src={logo}
      alt='interactive-logo'
      loading={loading}
    />
  )
}

/* const CategoryButton = ({ title, onClick }) => {
  return (
  <button className="Cat-button" onClick={onClick} >
     <code>{title}</code>
  </button>
  )
} */


/* const CategoriesList = ({ categories, onCategoryClick }) => {
  // per ciascun elemento di 'categories' renderizzare il componente <CategoryButton />
  return (
    <p>
      {props.categories.map((category, index) => 
        <span key={`cat-${index}`}>
          <CategoryButton
            title={category}
            onClick={props.onCategoryClick}
           
            />
        </span>
      )}
    </p>
  )
} */

const Joke = ({ value, categories }) => {
  return (
  <div className="Joke">
    <code className="Joke-Value">{value}</code>
      {/*  per ciascun elemento di 'categories', renderizzare:
      <span className="Selected-Cat" ... >
      <code>{* QUI LA STRINGA DELLA SINGOLA CATEGORIA *}</code>
      </span> */}
   </div>


  )
  
}

class App extends React.Component {
  // qui tutto ciò che serve al componente per essere inizializzato
  constructor(props) {
    super(props); 
    this.state = {
      loading: false,
      error: false,
      categories: [],
      selectedCategory: "",
      inputText: "",
      currentJoke: { } 
      
    }
  }    
/* 
  // getAllCategories
  // funzione che deve recuperare l'array di tutte le categorie esistenti e salvarlo
  getAllCategories =  async () => {
    let categories = []
    let error = false
    try {
      this.setState({ loading: true })
      const response = await fetch(ALLCATEGORIESURL)
      const data = await response.json()
      console.log('NEL TRY DATA: ', data)
      
      if (data.error) throw new Error(data.error)
    
      categories = [...data]
      console.log("errore", data.error)

    } catch (err) {

      error = true
      this.setState({
        ...this.state,
        error}, 
        () => { console.log( "eccomi!",this.state.error)})
      
    } finally { 
      this.setState({
          ...this.state, // see immutables
          categories: categories,
          loading: false,
          error //SINTASSI ABBREVIATA DI error:error
        })
    }
  } */

  /* // onCategoryClick
  // funzione richiamata al click del componente CategoryButton
  onCategoryClick = async () => {
      const jokeToShow= this.state.storedQuotes.filter(singleQuote => singleQuote.tags.findIndex(tag => tag === event.target.name) > -1)
      console.log("hai filtrato?", filterQuotes)
      this.setState({ 
        ...this.state,
        selectedTag: event.target.name,
        quotesToShow: filterQuotes,
        },
        () => {
         console.log("le citazioni per tag sono: ", this.state.quotesToShow)}
      )
    }
    let joke = {}
    let error = false

      try {
        this.setState({ loading: true })
        const response = await fetch(RANDOMJOKEBYCATURL+this.state.selectedCategory)
        const data = await response.json()
        console.log('NEL TRY DATA: ', data)
        
        if (data.error) throw new Error(data.error)
      
        joke = {...data}
        console.log("errore", data.error)
  
      } catch (err) {

        error = true
        this.setState({
          ...this.state,
          error}, 
          () => { console.log( "eccomi!",this.state.error)})
        
      } finally { 
        this.setState({
            ...this.state, // see immutables
            currentJoke: joke,
            loading: false,
            error //SINTASSI ABBREVIATA DI error:error
          })
      }
    }
    

  } */

  // getRandomJokeByCat
  // funzione che recupera una singola barzelletta e la salva


  // getJokeByKeyword
  // funzione che recupera le barzellette contenenti la parola chiave
  // digitata nel campo di testo
   getJokeByKeyword = async () => {
    let jokes = {}
    /* let error = false */

    try {
      this.setState({ loading: true })
      const response = await fetch(`${ALLLJOKESBYKEYWORD}${this.state.inputText}`)
      const data = await response.json()
      
      if (data && data.status) throw new Error(data.error)
    

      jokes = {...data}
    
      console.log("errore", data.error)
      console.log("oggetto", jokes.result[0].value)

    } catch (err) {
      console.log(err)
      launchErrorAlert()
     /* error = true
      this.setState({...this.state, error}, () => {
      console.log( "eccomi!",this.state.error)})  */
      
    } finally { 
      this.setState({
          ...this.state, 
          currentJoke: jokes.result[0].value,
          loading: false,
          error:false
        })
    }
  }



  // onInputTextChange
  onInputTexChange = (event) => {
  
    this.setState({ 
      ...this.state, 
      inputText: event.target.value
    })
  }

  // qui i lifecycle methods

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <Logo
            className={`App-logo${this.state.loading ? " App-logo-spinning" : ""}`}
          />
          <input
            type="search"
            id="search" 
            name="search"
            placeholder="Enter keyword here"
            onChange={this.onInputTexChange}
            value={this.state.inputText}
          />
          <button
            className="Search-Button"
            onClick={this.getJokeByKeyword}
          >
            <code>CLICK TO SEARCH!</code>
          </button>
          <code>or: </code>
          {/* <CategoriesList
          categories ={this.state.categories}
          onCategoryClick={this.onCategoryClick}
        
          /> */}
        </div>
        <div className="Content">
          <img
            src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
            className="Chuck-Logo"
            alt="chuck-logo"
          />
          <code>
            <h2>
              SELECTED CATEGORY:
              <span className="Selected-Cat">
                {/* QUI LA CATEGORIA SELEZIONATA */}
              </span>
            </h2>
          </code>
          {/* <button
            className="Random-Button"
            type="button" 
            onClick={this.getJokeByKeyword} >    
            <h2>GET RANDOM JOKE FOR SELECTED CATEGORY</h2>
          </button> */}
          <Joke value={this.state.currentJoke}/> 
        </div>
        <div className="footer">
        <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: Mariella Renzelli</code>
        </div>
      </div>
    );
  }

}

export default App;
