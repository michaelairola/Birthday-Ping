import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  center: {
    flex: 1,    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
  	color: "grey",
  	margin: 10,
  	fontSize: 18,
  },
  contact: {
  	flexDirection: "row",
  	alignItems: "center",
  	padding: 10,
  	width: "100%",

  	// height: ,
  	backgroundColor: "white",
  	borderColor: "#A9A9A9",
  	borderBottomWidth: 1,
  },
  contactInfo: {
  	fontSize: 18,
  	flex: 3,
  },
  birthdayInfo: {
  	flex: 1,
  },
});

