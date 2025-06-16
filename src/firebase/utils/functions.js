import { addDoc, collection, count, deleteDoc, getDoc, getDocs, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../configuration.mjs";

const historyRefs = collection(db, "historyAviancaAutoForm");

export const createDoc = async (_count = 0) => {
    try {
        const doc = await setDoc(historyRefs, { count: _count });
        return doc.id;
    }
    catch (error) {
        console.error("Ha ocurrio un error al crear la colección de History Usage. | Error: ", error);
        throw error;
    }
}

export const addDoc = async (_count = 0) => {
    try {
        const doc = await addDoc(historyRefs, { count: _count });
        return doc.id;
    }
    catch (error) {
        console.error("Ha ocurrido un error al agregar un documento | Error: ", error);
        throw error;
    }
}

const getDocById = async (docId = "undefined") => {
    try {
        const q = query(collection(db, "historyAviancaAutoForm"), where("id", "==", docId));
        const docFilter = await getDoc(q);
        return docFilter;
    }
    catch (error) {
        console.error("FILTER => Ha ocurrido un error al filtrar el documento con id: ", docId);
        return null;
    }
}

export const updateDoc = async (docId = "undefined", _updatecount = 0) => {
    try {

        const docToUpdate = getDocById(docId);
        if (!docToUpdate.exists()) {
            throw new Error("UPDATE => No se existe el documento con ID: ", docId);
        }
        await updateDoc(docToUpdate, { count: _updatecount });
    }
    catch (error) {
        console.error("UPDATE => No se pudo actualizar el documento con id: ", id + "| Error: ", error);
        throw error;
    }
}

export const deleteDocument = async (docID = "undefined") => {
    
    try {
        const docToDelete = getDocById(docID);
        await deleteDoc(docToDelete);
    }
    catch (error) {
        console.error("DELETE => Ha ocurrido un error al eliminar el documento con id: ", docID);
    }
}

export const getAllDocs = async () => {
    try {
        const results = [];
        const collection = await getDocs(historyRefs);
        Array.from(collection).forEach(doc => {
            results.push(doc.data());
            console.log("Doc: ", { id: doc.id, data: doc.data() });
        });
        return results;
    }
    catch (error) {
        console.error("Ha ocurrido un error al obtener la data de la colección history usage. | Error: ", error);
        throw error;
    }
}