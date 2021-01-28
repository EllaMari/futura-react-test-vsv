import React from 'react'
import logo from './logo.svg';
import './App.css';

const ALLCATEGORIESURL = 'https://api.chucknorris.io/jokes/categories'
const RANDOMJOKEBYCATURL = 'https://api.chucknorris.io/jokes/random?category=' 
const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' 

const launchErrorAlert = () => setTimeout(() => window.alert('errore!'), 500) 

// classe 'App-logo-spinning' durante il caricamento, altrimenti classe 'App-logo'
const Logo = ({ loading }) => {
  return (
    <img
      src={logo}
      alt='interactive-logo'
      className={loading}
    />
  )
}

const CategoryButton = ({ title, onClick }) => {
  return (
  <button className="Cat-button" onClick={onClick} >
     <code>{title}</code>
  </button>
  )
}


const CategoriesList = ({ categories, onCategoryClick }) => {
  // per ciascun elemento di 'categories' renderizzare il componente <CategoryButton />
  return (
    <p>
      {categories.map((category, index) => 
        <span key={`cat-${index}`}>
          <CategoryButton
            title={category}
            onClick={onCategoryClick}
            />
        </span>
      )}
    </p>
  )
}

const Joke = ({ value, categories }) => {
  return (
  <div className="Joke">
    <code className="Joke-Value">{value}</code>
   {/*  <>
      {categories.map((category, index) => 
        <span className="Selected-Cat" key={`cat-${index}`}>
          <code>{category} </code> 
        </span>)}
    </>  */}
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
      currentJoke: "",
      isCatMode: false
    }
  }    

  getAllCategories =  async () => {
  // funzione che deve recuperare l'array di tutte le categorie esistenti e salvarlo
    let categories = []
    let error = false
    try {
      const response = await fetch(ALLCATEGORIESURL)
      const data = await response.json()
      console.log('NEL TRY DATA: ', data)
      
      if (data.error) throw new Error(data.error)
    
      categories = [...data]
      console.log("errore", data.error)

    } catch (err) {

      this.setState({
        ...this.state,
        error:true
      })
      
    } finally { 
      this.setState({
          ...this.state, 
          categories: categories,
          loading: false,
          error 
      })
    }
  } 


  onCategoryClick =  (event) => {
  // funzione richiamata al click del componente CategoryButton  
  console.log ("categoria:", event.target.outerText)
      this.setState({
          ...this.state,
          selectedCategory: event.target.outerText,
          isCatMode: true,
          currentJoke: "",
          inputText: ""
      })
  }



  getRandomJokeByCat = async () => {
  // funzione che recupera una singola barzelletta e la salva
    let joke= {}
    let error = false

    try {
    this.setState({ loading: true })
    const response = await fetch(`${RANDOMJOKEBYCATURL}${this.state.selectedCategory}`)
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
        () => { console.log( "eccomi!",this.state.error)
      })
      
    } finally { 
      this.setState({
        ...this.state,
        currentJoke: joke.value, 
        loading: false,
        error 
     })
    }
  }


  // getJokeByKeyword
  // funzione che recupera le barzellette contenenti la parola chiave
  // digitata nel campo di testo
  getJokeByKeyword = async () => {
    let jokes = {}
    let currentJoke=""
    let error = false

    try {
      this.setState({ loading: true })
      const response = await fetch(`${ALLLJOKESBYKEYWORD}${this.state.inputText}`)
      const data = await response.json()
      
      if (data && data.status) throw new Error(data.error)
      if (data &&data.result.length=== 0 ) throw new Error(data.error)

      jokes = {...data}
    
      console.log("errore", data.error)
      console.log("oggetto", jokes.result[0].value)
      currentJoke=jokes.result[0].value
    } catch (err) {
      console.log(err)
      launchErrorAlert()
     /* error = true
      this.setState({...this.state, error}, () => {
      console.log( "eccomi!",this.state.error)})  */
      
    } finally { 
      this.setState({
          ...this.state, 
          currentJoke: currentJoke,
          loading: false,
          isCatMode: false,
          error
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

  componentDidMount() {
    this.getAllCategories()
  }




  render () {
    return (
      <div className="App">
        <div className="App-header">
          <Logo
            loading={`App-logo${this.state.loading ? " App-logo-spinning" : ""}`}
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
          <CategoriesList
          categories ={this.state.categories}
          onCategoryClick={this.onCategoryClick}
          />
        </div>
        <div className="Content">
          <img
            src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
            className="Chuck-Logo"
            alt="chuck-logo"
          />

          {this.state.isCatMode === true
          ? (<> <code>
                <h2>
                SELECTED CATEGORY:
                <span className="Selected-Cat">
                  {this.state.selectedCategory}
                </span>
                </h2>
              </code>
              <button
                className="Random-Button"
                type="button" 
                onClick={this.getRandomJokeByCat}>    
                <h2>GET RANDOM JOKE FOR SELECTED CATEGORY</h2>
              </button>
              <Joke value={this.state.currentJoke} categories={this.state.categories}/>
            </> )

        : (<Joke value={this.state.currentJoke} categories={this.state.categories}/>)}
        </div>
        <div className="footer">
        <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: Mariella Renzelli</code>
        </div>
      </div>
    );
  }
}



export default App;
