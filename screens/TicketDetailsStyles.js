import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a2be2', // Ljubičasta pozadina
    padding: 20,
  },
  ticketTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  ticketDesc: {
    fontSize: 16,
    color: 'white',
    backgroundColor: '#7a1fd6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  ticketStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f8f8f8',
    marginBottom: 20,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  commentItem: {
    backgroundColor: '#6a1dbd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  commentText: {
    fontSize: 14,
    color: '#f8f8f8',
  },
  commentInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginTop: 10,
  },
  commentButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  commentButtonText: {
    color: '#8a2be2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
});
