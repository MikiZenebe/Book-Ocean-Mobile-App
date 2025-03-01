import dbService from "./dbServices";
import { ID } from "react-native-appwrite";

//Appwrite Db and collectionID
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteServices = {
  //Get notes
  async getNotes() {
    const res = await dbService.getDocs(dbId, colId);
    if (res.error) {
      return { error: res.error };
    }

    return { data: res };
  },
};

export default noteServices;
