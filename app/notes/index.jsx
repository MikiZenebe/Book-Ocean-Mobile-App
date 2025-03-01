import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import NoteList from "../../components/NoteList";
import AddNoteModel from "../../components/AddNoteModel";
import noteServices from "../../services/noteServices";

export default function NoteScreen() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const res = await noteServices.getNotes();

      if (res.error) {
        setError(res.error);
        Alert.alert("Error", res.error);
      } else {
        setNotes(res.data);
        setError(null);
      }
      setLoading(false);
    };

    fetchNotes();
  });

  //Add new note
  const addNote = () => {
    if (newNote.trim() === "") return;

    setNotes((prevNotes) => [
      ...prevNotes,
      { id: Date.now.toString(), text: newNote },
    ]);

    setNewNote("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <NoteList notes={notes} />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addBtnTxt}>+ Add Note</Text>
      </TouchableOpacity>

      <AddNoteModel
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  addBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#3A556A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addBtnTxt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
