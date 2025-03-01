import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

export default function AddNoteModel({
  modalVisible,
  setModalVisible,
  newNote,
  setNewNote,
  addNote,
}) {
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add a New Note</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter note.."
            placeholderTextColor="#aaa"
            value={newNote}
            onChangeText={setNewNote}
          />
          <View style={styles.modalBtns}>
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelBtnTxt}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalSaveBtn} onPress={addNote}>
              <Text style={styles.saveBtnTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalCancelBtn: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelBtnTxt: {
    fontSize: 16,
    color: "#333",
  },
  modalSaveBtn: {
    backgroundColor: "#6ECDAA",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  saveBtnTxt: {
    fontSize: 16,
    color: "#fff",
  },
});
