import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F5',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#6200EE',
    color: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flex: 1,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  arrow: {
    fontSize: 18,
    color: 'white',
  },
  exportButton: {
    backgroundColor: '#0288D1',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  editIcon: {
    fontSize: 20,
    color: '#6200EE',
     fontWeight: 'bold'
  }

});
