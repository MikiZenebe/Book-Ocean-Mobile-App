import { databases } from "./appwrite";

const dbService = {
  //Get Docs
  async getDocs(dbId, colId) {
    try {
      const res = await databases.listDocuments(dbId, colId);
      return res.documents || [];
    } catch (error) {
      console.error("Error fetching docs: ", error);
      return { error: error.message };
    }
  },
};

export default dbService;
