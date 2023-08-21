import {saveNoteT} from "../../../src/store/journal/thunks.js";
import {addEmptyNote, setActiveNote} from "./../../../src/store/journal/journalSlice.js";
import {initialNote} from "../../../src/helper/notes.js";
import {collection, deleteDoc, getDocs} from "firebase/firestore";
import {firebaseDb} from "../../../firebase/index.js";

jest.mock("../../../src/store/journal/");
const uuidInitial = "1234";

describe("Test journal thunk", () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(() => jest.clearAllMocks());
    test("Test create new empty note ", async () => {

        getState.mockReturnValue({auth: {uuid: uuidInitial}});
        await saveNoteT(initialNote)(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(addEmptyNote({
            body: "",
            title: "",
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: []
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: "",
            title: "",
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: []
        }));

        expect(dispatch).toHaveBeenCalledTimes(3);

        const firebaseCollection = collection(firebaseDb, `/${uuidInitial}`);
        const firebaseDocuments = await getDocs(firebaseCollection);
        const deletePromises = [];
        firebaseDocuments.forEach(firebaseDocument => {
            deletePromises.push(deleteDoc(firebaseDocument.ref));
        });
        await Promise.all(deletePromises);
    });
});