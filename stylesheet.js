import { Dimensions } from 'react-native';
import { StyleSheet } from "react-native";
import { DefaultTheme } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SwiftstudyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: "#1b1c1d",
    primary: "#00c3e6",
    card: "rgba(54, 56, 57, 1)",
    text: "#F6F8FF",
    placeholderText: "#6a6a6a",
  }
};

const SwiftstudyLightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: "#F6F8FF",
    primary: "#00c3e6",
    card: "#f3f6ff", 
    text: "#111111",
    placeholderText: "#6a6a6a",
  },
};

export { SwiftstudyTheme, SwiftstudyLightTheme };


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
  optionsMenu: {
  position: "absolute",
  top: 60,          //to make it appear under the header and look good
  right: 10,
  backgroundColor: "#222",
  borderRadius: 8,
  paddingVertical: 4,
  paddingHorizontal: 8,
  elevation: 4,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  zIndex: 100,
},
optionsMenuItem: {
  paddingVertical: 8,
  paddingHorizontal: 12,
},
optionsMenuText: {
  color: "white",
  fontSize: 14,
},
renameOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 200,
},
renameBox: {
  width: "80%",
  backgroundColor: "#222",
  borderRadius: 12,
  padding: 16,
},
renameTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "white",
  marginBottom: 12,
},
renameInput: {
  borderWidth: 1,
  borderColor: "#555",
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 8,
  color: "white",
  marginBottom: 16,
},
renameButtonsRow: {
  flexDirection: "row",
  justifyContent: "flex-end",
},
renameButtonCancel: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  marginRight: 8,
},
renameButtonSave: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  backgroundColor: "#00c3e6",
  borderRadius: 6,
},
renameButtonText: {
  color: "white",
  fontSize: 14,
},

settingsContainer: {
  flex: 1,
  paddingHorizontal: 16,
  paddingTop: 24,
},
settingsHeaderText: {
  fontSize: 24,
  fontWeight: "700",
  marginBottom: 24,
},
settingsSection: {
  marginBottom: 32,
},
settingsSectionTitle: {
  fontSize: 16,
  fontWeight: "600",
  marginBottom: 12,
},
settingsRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 12,
  marginBottom: 10,
},
settingsRowTitle: {
  fontSize: 16,
  fontWeight: "500",
  marginBottom: 4,
},
settingsRowSubtitle: {
  fontSize: 13,
  color: "#6a6a6a",
},
deleteButton: {
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: "#ff4d4f",
  backgroundColor: "transparent",
  alignSelf: "center",
},
deleteButtonText: {
  color: "#ff4d4f",
  fontWeight: "600",
  fontSize: 14,
},
changeEmailInput: {
  marginTop: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.1)",
  fontSize: 14,
},

changeEmailButton: {
  alignSelf: "center",
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 999,
  backgroundColor: "#00c3e6",
},

changeEmailButtonText: {
  color: "#ffffff",
  fontWeight: "600",
  fontSize: 14,
},

homeContainer: {
  flex: 1,                                                                                                           
  width: "100%",
  paddingTop: 24,                                                                                                    
},              
recentlyRevisedTitle: {
  fontSize: 20,
  fontWeight: "700",
  paddingHorizontal: 20,
  marginBottom: 12,
},                                                                                                                   
recentDecksList: {
  paddingHorizontal: 20,                                                                                             
  gap: 12,      
},
recentDeckCard: {
  width: 140,
  height: 100,
  borderRadius: 16,
  borderColor: "#00c3e6",                                                                                            
  borderWidth: 1.25,
  padding: 12,                                                                                                       
  justifyContent: "center",
},
recentDeckTitle: {
  fontSize: 15,
  fontWeight: "600",
},                                                                                                                   
recentDeckEmpty: {
  fontSize: 14,                                                                                                      
  opacity: 0.5, 
  paddingTop: 8,
},
searchBarContainer: {
  paddingHorizontal: 20,
  marginBottom: 16,
},
searchBar: {
  flexDirection: "row",
  alignItems: "center",
  borderRadius: 16,
  borderWidth: 1.25,
  borderColor: "#404040",
  paddingHorizontal: 14,
  paddingVertical: 10,
  gap: 8,
},
searchBarInput: {
  flex: 1,
  fontSize: 15,
  padding: 0,
},
searchResultCard: {
  borderRadius: 14,
  borderColor: "#00c3e6",
  borderWidth: 1.25,
  padding: 14,
},
summaryRow: {
  flexDirection: "row",
  paddingHorizontal: 20,
  gap: 12,
  marginBottom: 16,
},
summaryItem: {
  flex: 1,
  borderRadius: 12,
  padding: 12,
  alignItems: "center",
},
summaryNumber: {
  fontSize: 22,
  fontWeight: "700",
},
summaryLabel: {
  fontSize: 12,
  opacity: 0.5,
  marginTop: 2,
},
streakText: {
  paddingHorizontal: 20,
  fontSize: 15,
  fontWeight: "600",
  marginBottom: 8,
},
scoreBadge: {
  fontSize: 13,
  fontWeight: "700",
  color: "#00c3e6",
  marginTop: 6,
},
reviseAnswerRow: {                                                                                                   
  flexDirection: "row",
  justifyContent: "center",                                                                                          
  gap: 12,                 
  paddingHorizontal: 20,
  marginBottom: 8,      
},                                                                                                                   
reviseAnswerButton: {
  flex: 1,                                                                                                           
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,                  
  paddingVertical: 14,                                                                                               
  borderRadius: 16,   
},                                                                                                                   
rememberedButton: {
  backgroundColor: "#22c55e",
},                           
notRememberedButton: {
  backgroundColor: "#ef4444",
},                           
reviseAnswerButtonText: {                                                                                            
  color: "#fff",         
  fontWeight: "600",                                                                                                 
  fontSize: 15,     
},             
reviseProgressText: {
  textAlign: "center",
  fontSize: 13,
  marginBottom: 12,                                                                                                  
  opacity: 0.5,
},         


});

export default styles;