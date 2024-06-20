
export default function Task({key, note, showModal, handleOpenModal, handleCloseModal, updateTask, deleteTask, userid}){
    function reformatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;
        return formattedDate;
    }
    function truncateNote(note){
        const maxLength = 100;

        if(!note)
            return

        if (note.length > maxLength) {
            // Find the last space within the maxLength
            const truncated = note.slice(0, maxLength);
            const lastSpaceIndex = truncated.lastIndexOf(' ');
            if (lastSpaceIndex > 0) {
                return truncated.slice(0, lastSpaceIndex) + '...';
            }
            return truncated + '...';
        }
        return note;
    }

    return(
        <button key={key} className='border-2 border-white rounded-lg'>
        <div className='flex flex-row justify-between '>
            <h1 className='p-6'>{note.name}</h1>
            <p  className='p-6'>{truncateNote(note.content)}</p>
            <p  className='p-6'>{reformatDate(note.creationDate)}</p>
        </div>
    </button>
    )
}