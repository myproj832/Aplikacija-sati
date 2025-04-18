import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  loadingText: {
    color: '#6200ee',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  arrow: {
    fontSize: 18,
    color: '#ffffff',
    marginLeft: 10,
  },
  exportButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  exportButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  logDetails: {
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeText: {
    fontSize: 14,
    color: '#555',
  },
  breakText: {
    fontSize: 14,
    color: '#888',
  },
  userText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  editIconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 6,
  },
  editIcon: {
    fontSize: 18,
    color: '#6200ee',
  },
  addButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
