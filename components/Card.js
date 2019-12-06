import React from 'react'
import { StyleSheet, View, TouchableHighlight, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons' // use FontAwesome from the expo vector icons

export default function Card(props) {
	let { is_open, src, name, color, clickCard} = props;
	let CardSource = FontAwesome; // set FontAwesome as the default icon source
	let icon_name = 'question-circle';
	let icon_color = '#353535';

	if(is_open) {
		CardSource = src;
		icon_name = name;
		icon_color = color;
	}

	return (
		<View style={styles.card}>
			<TouchableHighlight onPress={clickCard} activeOpacity={0.7} underlayColor="transparent">
				<CardSource name={icon_name} size={60} color={icon_color}/>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center'
	}
});