import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  ticketItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8a2be2',
  },
  ticketDesc: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  ticketStatus: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#8a2be2',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  assignButton: {
      backgroundColor: '#FF8C00',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
  },
  assignButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  assignedToText: {
      fontSize: 16,
      color: '#ffffff',
      marginTop: 10,
      fontWeight: 'bold',
  },

});
