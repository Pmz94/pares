import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Constants from 'expo-constants'

export default function Header() {
	return (
		<View style={styles.header}>
			<StatusBar barStyle="light-content"/>
			<Text style={styles.header_text}>Pares</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#008cfa'
	},
	header_text: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 17,
		textAlign: 'center',
		paddingTop: Constants.statusBarHeight
	}
});