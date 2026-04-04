import { Dimensions } from 'react-native';
import { StyleSheet } from "react-native";
import { DefaultTheme } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SwiftstudyTheme = {
  ...DefaultTheme,
  DarkTheme: true,
  colors: {
    ...DefaultTheme.colors,
    background: "#1b1c1d",
    primary: "#00c3e6",
    card: "#18191a",
    text: "#F6F8FF",
    placeholderText: "#6a6a6a",
  }
};

export { SwiftstudyTheme };


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    maxWidth: windowWidth * 1,
    maxHeight: windowHeight * 1.04,
    paddingHorizontal: "10%",
  },
  appName: {
    position: "absolute",
    bottom: windowHeight * 0.875,
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "",
    padding: 10,
    width: "100%",
    textAlign: "center",
  },
  imageContainer: {
    justifyContent: "center", 
    alignItems: "center",
    position: "absolute",
    bottom: 400,
    left: 0,
    right: 0,
  },
  loginTitle: {
    position: "relative", 
    marginTop: "70%",
    bottom: "30%", 
    right: "40%", 
    fontWeight: "bold", 
    fontFamily: "",
    fontSize: 40,
  },
  inputBox: {
    borderColor: "#404040",
    padding: 10,
    borderRadius: 20,
    width: "90%",
    height: "50",
    marginTop: 20,
    borderWidth: 1.25,
  },
  inputContainer: {
    position: "relative",
    bottom: "25%",
    width: windowWidth * 0.9,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 20, 
    padding: windowHeight * 0.015,
    width: windowWidth * 0.9,
    height: windowHeight * 0.065,
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 19,
  },
  buttonContainer: {
    position: "relative",
    bottom: windowHeight * 0.15,
  },
  signUpText: {
    position: "absolute",
    top: "90%",
  },
  BackArrow: {
    position: "relative",
    padding: 20,
    right: windowWidth * 0.4,
    bottom: windowHeight * 0.1,
  },
  createAccountTitle: {
    position: "relative", 
    marginTop: "70%",
    bottom: "30%", 
    right: "20%", 
    fontWeight: "bold", 
    fontFamily: "",
    fontSize: 35,
    marginLeft: "5%",
  },
  eyeIcon: {
    position: "absolute",
    zIndex: 1,
    right: windowWidth * 0.1,
    bottom: "6%",
  },
  navbar: {
    height: "100%",
    width: "100%",
  },
  CreateButton: {
    position: "relative",
    paddingRight: windowWidth * 0.05,
  },
  DeckTemplate: {
    position: "relative",
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    borderRadius: 20,
    backgroundColor: "rgba(54, 56, 57, 1)",
    borderColor: "#00c3e6",
    borderWidth: 1.25,
    
    
  },
  deckTemplateTitle: {
    paddingLeft: 30,
    paddingTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: "white",
  },
  deckTemplateDescription: {
    paddingLeft: 30,
    fontSize: 15,
    color: "white",
  },
  createDeckButton: {
    position: "relative",
    width: "30%",
    height: "20%",
    margin: 10,
    backgroundColor: "rgba(4, 134, 240, 1)",
    borderRadius: 30,
    alignSelf: 'flex-end',
    top: "25%",

  },
  deckButtonText: {
    paddingTop: "12.5%",
    paddingLeft: "30%",

  },

  LibraryContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    maxWidth: windowWidth * 1,
    maxHeight: windowHeight * 1.04,
  },

  Deck: {
    position: "relative",
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    borderRadius: 20,
    backgroundColor: "rgba(54, 56, 57, 1)",
    borderColor: "#00c3e6",
    borderWidth: 1.25,
    margin: 10,
  },
  deckTitle: {
    paddingLeft: 30,
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: "white",
  },
  ReviseButton: {
    position: "relative",
    paddingRight: windowWidth * 0.05,
    backgroundColor: "#00c3e6",
    width: "100%",
    height: "100%"
  },
  noCardsText: {
    color: "white",
  },
  reviseScreenContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  reviseRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  reviseArrowButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  reviseCard: {
    position: "relative",
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    borderRadius: 20,
    backgroundColor: "rgba(54, 56, 57, 1)",
    borderColor: "#00c3e6",
    borderWidth: 1.25,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
},
  reviseCardText: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
  reviseCounterText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    color: "white",
    opacity: 0.7,
  },
  reviseArrowsRow: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
},

});

export default styles;