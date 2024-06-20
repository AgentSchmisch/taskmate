import PageContent from "@/app/components/notes/PageContent";
import { getNotes, getNotesByUser, createNote, updateNote, deleteNote } from "@/models/NoteModel";

export default async function Home() {

  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <PageContent getNotesByUser={getNotesByUser} createNote={createNote} updateNote={updateNote} deleteNote={deleteNote}/>
      </main>
    </>
  );

}