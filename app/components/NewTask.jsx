import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export default function NewTask() {
    function handleButtonPress(){
        console.log('Button Pressed')
    }

    return (
        <button type="button" onClick={handleButtonPress}>
            <div className='border-dashed border-2 border-white rounded-lg'>
                <FontAwesomeIcon className="p-12" icon={faCirclePlus} />
            </div>
        </button>
    )
}