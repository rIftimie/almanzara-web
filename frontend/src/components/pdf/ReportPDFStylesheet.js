import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
	viewer: {
		width: window.innerWidth, //the pdf viewer will take up all of the width and height
		height: window.innerHeight,
	},
	page: {
		flexDirection: 'column',
		fontFamily: 'Times-Roman',
	},
	header: {
		fontSize: 22,
		padding: 20,
	},
	divide: {
		padding: 5,
		marginLeft: 20,
		marginRight: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		fontSize: 12,
	},
	divideHalf: {
		padding: 5,
		marginLeft: 20,
		marginRight: 20,
		flexDirection: 'row',
		width: '50%',
		justifyContent: 'space-between',
		fontSize: 12,
	},
	section: {
		marginLeft: 10,
		marginRight: 10,
		padding: 10,
		flexGrow: 1,
	},
	sectionRow: {
		flexDirection: 'row',
	},
	sectionRow30: {
		width: '30%',
		borderColor: '#000000',
		borderWidth: 1,
		margin: 5,
		padding: 5,
		textAlign: 'center',
		justifyContent: 'space-around',
	},
	sectionRow70: {
		width: '70%',
		borderColor: '#000000',
		borderWidth: 1,
		margin: 5,
		padding: 5,
	},
	sectionRowTime: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '70%',
		borderColor: '#000000',
		borderWidth: 1,
		margin: 5,
		padding: 5,
	},
	sectionRowTimeSection: {
		width: '50%',
	},
	sectionRowSub: {
		fontSize: 12,
	},
	sectionRowHeader: {},
});
