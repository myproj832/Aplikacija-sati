import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a2be2', // Ljubičasta pozadina
    padding: 20,
  },
  label: {
    color: '#ffffff', // Bela boja teksta
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    color: '#000000',
    height: 50,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000000',
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#4b0082', // Tamnija ljubičasta
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedFileText: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#8a2be2', // Ljubičasta boja za dugme
    fontSize: 18,
    fontWeight: 'bold',
  },
  fileButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  fileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
descriptionInput: {
  width: '100%', // ✅ Pokriva celu širinu ekrana
  height: 300, // ✅ Povećava visinu unosa
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 10,
  backgroundColor: '#fff',
  fontSize: 16, // ✅ Veći font za bolju čitljivost
  textAlignVertical: 'top', // ✅ Tekst počinje od vrha
},

});
