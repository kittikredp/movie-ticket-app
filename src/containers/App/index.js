import React, { Component } from 'react'
import { connect } from "react-redux"
import _ from 'lodash'
import { bindActionCreators } from "redux"
import { fetchMovies ,setActiveMovie} from '../../actions'
import MovieBlock from '../../components/MovieBlock'
import './index.scss'
import AddMovieModal from '../AddMovieModal'
import loadingGif from '../../images/rolling.gif'

class App extends Component {
	state = {
		showModal: false,
		movieToShow: [],
		movieToSearch: '',
		sorting: {
			sortBy: 'title',
			orderBy: 'asc'
		}
	}
	
	componentDidMount() {
		this.props.fetchMovies()
	}

	searchByTitle = _.debounce((title) => {
		this.setState({
			movieToSearch: title
		})
	}, 500)
	
  handleOpenModal = (movie) => {
		this.props.setActiveMovie(movie)
		this.setState({ showModal: true })
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false })
	}
	
  handleChangeName = e => {
		this.searchByTitle(e.target.value)
	}
	
	handleSort = e => {
		const sortValue = (e.target.value).split('-')
		const sortBy = sortValue[0]
		const orderBy = sortValue[1]
		
		this.setState({
			sorting: {
				sortBy,
				orderBy
			}
		})
	}

	renderMovieBlocks = (movieList) => {

		if (this.props.movie.isLoading) return <img className="loading-gif" src={loadingGif} alt="loading..." />
		if (!movieList) return null
		
		const myMovieBlocks = movieList.map((movie, i) => {
			return <MovieBlock
				showHalf
				movie={movie}
				key={i}
				onClick={() => {this.handleOpenModal(movie)}}
				/>
		})
	
		return myMovieBlocks
	}

  render() {
		const {movieToSearch, sorting} = this.state
		const movieList = this.props.movie.movieList
		
		const movieToShow = movieToSearch.length != 0 
			? movieList.filter((movie) =>{
					const title = movie.title.toLowerCase()
					const titleToSearch = movieToSearch.toLowerCase()
					return title.includes(titleToSearch)
				})
			: movieList
		
		const sortMovie = _.orderBy(movieToShow, [sorting.sortBy],[sorting.orderBy])
		
		return (
      <div className="App">
				<div className="header">
					<div className="header-text">
						Movie Ticket
					</div>
				</div>

				<div className="body">
					<div className="search-bar">
						<input
							className="name-search"
							type="text"
							placeholder="Find movie"
							onChange={this.handleChangeName}
						/>
						<select className="sort-box" onChange={this.handleSort}>
							<option value="title-asc">Title A to Z</option>
							<option value="title-desc">Title Z to A</option>
							<option value="releaseDate-asc">Date early to late</option>
							<option value="releaseDate-desc">Date late to early</option>
							<option value="ticketFee-asc">Price low to high</option>
							<option value="ticketFee-desc">Price high to low</option>
						</select>
					</div>
					<div className="movie-block-container">
						{this.renderMovieBlocks(sortMovie)}
					</div>
				</div>

				<AddMovieModal
					isOpen={this.state.showModal}
					onRequestClose={this.handleCloseModal}
				/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchMovies, setActiveMovie }, dispatch)
}

const mapStateToProps = ({ movie }) => {
  return { movie }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)