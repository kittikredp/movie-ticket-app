import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Modal from 'react-modal'
import InputNumber from 'rc-input-number'
import 'rc-input-number/assets/index.css'
import {clearActiveMovie} from '../../actions'
import MovieBlock from '../../components/MovieBlock'
import './index.scss'

const initState = {
	seatAmount: 0,
	totalPrice: 0,
	inputMoney: 0,
	totalChange: 0,
	change: {
		note500: 0,
		note100: 0,
		note50: 0,
		note20: 0,
		coin10: 0,
		coin5: 0,
		coin2: 0,
		coin1: 0
	}
}

class AddMovieModal extends Component {
	state = initState
	
	componentWillReceiveProps(nextProps) {
		if (this.props.isOpen != nextProps.isOpen) {
			if(nextProps.isOpen) {
			} else {
				this.props.clearActiveMovie()
			}
		}
	}

	renderMovieBlocks = () => {
		const movie = this.props.movie.activeMovie
		if (!movie) return null
		
		return <MovieBlock
				movie={movie}
			/>
	}

	handleSeatAmount = (seatAmount) => {
		this.setState({
			seatAmount,
			totalPrice: seatAmount * this.props.movie.activeMovie.ticketFee
		 })
	}
	handleInputMoney = (inputMoney) => {

		console.log('inputMoney', inputMoney)
		console.log('this.state.totalPrice', this.state.totalPrice)
		this.setState({
			inputMoney,
			totalChange: (parseInt(inputMoney) - parseInt(this.state.totalPrice))
		 })
	}
	
  render() {
		const {isOpen, onRequestClose} = this.props
		
    return (
			<Modal
				isOpen={isOpen}
				onRequestClose={onRequestClose}
				shouldCloseOnOverlayClick={true}
				className="Modal"
				overlayClassName="Overlay"
			>
				<div className="movie-ticket-container">
					<div className="movie-block">
						{ this.renderMovieBlocks() }
					</div>
					<div className="seat-amount">
						<span>Seat amount</span>
						<InputNumber
							min={1}
							max={999}
							value={this.state.seatAmount}
							style={{ width: 100 }}
							onChange={this.handleSeatAmount}
						></InputNumber>
					</div>
					<div className="total-price">
						<span>Total price</span>
						{this.state.totalPrice}
					</div>
					<div className="inputMoney">
						<span>Input money</span>
						<input type="text" onChange={(e) => {this.handleInputMoney(e.target.value)}}></input>
					</div>
					<div className="change">
						<span>Your change</span>
						{this.state.totalChange}
					</div>
				</div>
			</Modal>
  	)
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clearActiveMovie }, dispatch)
}

const mapStateToProps = ({ movie }) => {
  return { movie }
}

Modal.setAppElement('body')

export default connect(mapStateToProps, mapDispatchToProps)(AddMovieModal)