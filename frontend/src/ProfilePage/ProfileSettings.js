import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileSettings = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [password, setPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [bio, setBio] = useState("");
    const [user, setUser] = useState({});
    const [image, setImage] = useState();
    
    useEffect((e) => {
        axios.post('http://localhost:3001/api/get-user', {
            id: "6625a122fc13111100000001"
        })
        .then((res)=>{
            console.log(res.data, "usr id")
            if(res.data.success){
                setUser(res.data.data);
                setPassword(res.data.data.password);
                setContactNumber(res.data.data.contactNumber);
                setBio(res.data.data.bio);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    })

    const handleFileUpload = async (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const toggleEditing = (e) => {
        e.preventDefault(); // Prevent form submission
        setIsEditing(prevState => !prevState);
    };

    const handleSave = async (e) => {
        e.preventDefault(); // Prevent form submission
        setIsEditing(false);

        try {
            user.bio = bio;
            user.password = password;
            user.contactNumber = contactNumber;
            user.user_image = image;

            axios.post('https://akap-api.vercel.app/api/edit-account', user)
        } catch (err) {
            console.log(err)
        }
    };

    const handleDelete = (e) => {
        try {
            axios.post('https://akap-api.vercel.app/api/delete-user', user);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <h1 className='text-3xl my-3 text-blue-600'> Settings </h1>
            <form className='overflow-auto xl:w-6/12 no-scrollbar px-2'>
                {/* user photo */}
                <h3> Profile photo </h3>
                <div className="image-container h-32 w-32 rounded-full overflow-hidden">
                    {user.user_image && 
                        <img src={user.user_image} className=" w-32 h-32 object-cover" />
                    }
                    <img src={require("../images/defaultUser.jpg")} alt="no profile" className='w-32 h-32 object-cover'/>
                </div>
                <div className="">
                    <h1 className="text-sm font-medium text-gray-900 mt-2">
                    Upload new profile image
                    </h1>
                    <input type="file" id="profileImage" name="profileImage" accept="image/*" className="file-input file-input-bordered file-input-ghost w-full max-w-xs bg-white"
                    onChange={()=> {}} 
                    />
                </div>
                {/* bio */}
                <label htmlFor="bio" className="block text-sm font-medium text-gray-900 dark:text-white mt-2">Bio</label>
                <textarea id="bio" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-h-40 resize-none" placeholder={bio} disabled={!isEditing} onChange={(e) => setBio(e.target.value)}></textarea>
                {/* password */}
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Password</label>
                <input type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" disabled={!isEditing} onChange={(e) => setPassword(e.target.value)} />
                {/* contact number */}
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-900 dark:text-white mt-2">Contact number</label>
                <input type="text" id="contactNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={contactNumber} disabled={!isEditing} onChange={(e) => setContactNumber(e.target.value)} />
                <button className='btn bg-green-600 text-white' onClick={isEditing ? handleSave : toggleEditing}>{isEditing ? 'Save' : 'Edit profile'}</button>
            </form>
            <div className="flex justify-center">
                <button className="btn bg-red-500 text-white" onClick={()=>document.getElementById('sureDelete').showModal()}>Delete account</button>
                <dialog id="sureDelete" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Caution</h3>
                    <p className="py-4">Are you sure you want to delete your account?</p>
                    <div className="modal-action flex">
                        <button className='btn bg-red-500 ' onClick={handleDelete}> Delete </button>
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
                </dialog>
            </div>
        </>
    );
};

export default ProfileSettings;
