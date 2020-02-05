import React from 'react'
import { Button, StyleSheet, View, Alert, Text, SafeAreaView, StatusBar } from 'react-native'
import Constants from 'expo-constants'
import { Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import Card from './components/Card'

export default class App extends React.Component {

	constructor(props) {
		super(props);

		// bind the functions to the class
		this.renderCards = this.renderCards.bind(this);
		this.resetCards = this.resetCards.bind(this);

		// icon sources
		let sources = {
			'fontawesome': FontAwesome,
			'fontawesome5': FontAwesome5,
			'entypo': Entypo,
			'ionicons': Ionicons,
			'material-comunity': MaterialCommunityIcons,
		};

		// the unique icons to be used
		let cards = [
			{ src: 'fontawesome5', name: 'apple', color: '#000000' },
			{ src: 'fontawesome5', name: 'android', color: '#a5c63b' },
			{ src: 'fontawesome', name: 'facebook-square', color: '#3b5998' },
			{ src: 'fontawesome', name: 'twitter', color: '#1da1f2' },
			{ src: 'fontawesome', name: 'instagram', color: '#da2e82' },
			{ src: 'entypo', name: 'youtube', color: '#ff0000' },
			{ src: 'ionicons', name: 'logo-whatsapp', color: '#25d366' },
			{ src: 'ionicons', name: 'logo-css3', color: '#2965f1' },
			{ src: 'material-comunity', name: 'language-php', color: '#777bb3' },
			{ src: 'material-comunity', name: 'language-javascript', color: '#f7df1e' },
			{ src: 'material-comunity', name: 'language-html5', color: '#f16529' },
			{ src: 'material-comunity', name: 'language-java', color: '#f80000' },
		];

		// next: add code creating the clone and setting the cards in the state
		let clone = JSON.parse(JSON.stringify(cards)); // create a completely new array from the array of cards

		this.cards = cards.concat(clone); // combine the original and the clone

		// add the ID, source and set default state for each card
		(this.cards).map(card => {
			card.id = Math.random().toString(36).substring(7);
			card.src = sources[card.src];
			card.is_open = false;
		});

		this.cards = (this.cards).shuffle(); // sort the cards randomly

		// set the default state
		this.state = {
			current_selection: [], // this array will contain an array of card objects which are currently selected by the user. This will only contain two objects at a time.
			selected_pairs: [], // the names of the icons. This array is used for excluding them from further selection
			score: 0, // default user score
			cards: this.cards, // the shuffled cards
		};
	}

	renderRows() {
		let contents = this.getRowContents(this.state.cards);
		return contents.map((cards, i) => (
			<View key={i} style={styles.row}>{this.renderCards(cards)}</View>
		));
	}

	getRowContents(cards) {
		let contents_r = [];
		let contents = [];
		let count = 0;

		for(let i = 0, len = cards.length; i < len; i++) {
			let item = cards[i];

			count += 1;
			contents.push(item);

			if(count === 4) {
				contents_r.push(contents);
				count = 0;
				contents = [];
			}
		}

		return contents_r;
	}

	renderCards(cards) {
		return cards.map((card, i) => (
			<Card
				key={i}
				src={card.src}
				name={card.name}
				color={card.color}
				is_open={card.is_open}
				clickCard={this.clickCard.bind(this, card.id)}
			/>
		));
	}

	clickCard(id) {
		let { selected_pairs, current_selection, score, cards } = this.state;

		// get the index of the currently selected card
		let index = cards.findIndex(card => card.id === id);

		let cardz = cards;

		// the card shouldn't already be opened and is not on the array of cardz whose pairs are already selected
		if(cardz[index].is_open === false && selected_pairs.indexOf(cardz[index].name) === -1) {

			// next: add code for processing the selected card
			cardz[index].is_open = true;

			current_selection.push({
				index: index,
				name: cardz[index].name
			});

			// next: add code for determining whether the user has selected the correct pair or not
			if(current_selection.length === 2) {
				if(current_selection[0].name === current_selection[1].name) {
					score += 1; // increment the score
					selected_pairs.push(cardz[index].name);

					this.checkPoints(score);
				} else {
					cardz[current_selection[0].index].is_open = false; // close the first

					// delay closing the currently selected card by some miliseconds.
					setTimeout(() => {
						cardz[index].is_open = false;
						this.setState({ cards: cardz });
					}, 400);
				}

				current_selection = [];
			}

			// next: add code for updating the state
			this.setState({ score, cards: cardz, current_selection });
		}
	}

	checkPoints(score) {
		if(score === (this.state.cards.length / 2)) {
			Alert.alert('Ganaste!', 'Empieza de nuevo', [{ text: 'Aceptar', onPress: this.resetCards }]);
		}
	}

	resetCards() {
		// close all cards
		let cards = (this.cards).map(obj => {
			obj.is_open = false;
			return obj;
		});

		cards = cards.shuffle(); // re-shuffle the cards

		// update to default state
		this.setState({
			current_selection: [],
			selected_pairs: [],
			score: 0,
			cards: cards,
		});
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					<View style={styles.header}>
						<StatusBar barStyle="light-content"/>
						<Text style={styles.header_text}>Pares</Text>
					</View>

					<View style={styles.body}>{this.renderRows.call(this)}</View>

					<View style={styles.score_container}>
						<Text style={styles.score}>Puntos: {this.state.score}</Text>
					</View>

					<View style={styles.button_container}>
						<Button onPress={this.resetCards} title="Reiniciar" color="#008cfa"/>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#fff'
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#008cfa'
	},
	header_text: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 18,
		textAlign: 'center',
		paddingTop: Constants.statusBarHeight
	},
	body: {
		flex: 7,
		justifyContent: 'space-between',
		paddingTop: 5
	},
	row: {
		flex: 1,
		flexDirection: 'row'
	},
	score_container: {
		flex: 0.5,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#f00'
	},
	score: {
		fontSize: 24,
		fontWeight: 'bold'
	},
	button_container: {
		padding: 7
	}
});

Array.prototype.shuffle = function() {
	let i = this.length;
	let j;
	let temp;

	// While there remain elements to shuffle...
	while(i !== 0) {
		// Pick a remaining element...
		j = Math.floor(Math.random() * i);
		i -= 1;
		// And swap it with the current element.
		temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}

	return this;
};