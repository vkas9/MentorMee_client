import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postAction } from '../../../redux/postStore';

const CreatePost = ({ onPublish,setLoading,loading }) => {



   const{token}= useSelector((store)=>store.credential);
 const navigate=useNavigate()
 const dispatch=useDispatch()
 useEffect(() => {
  if (!token) {
    dispatch(postAction.setCurrentTab(null));
    navigate("/login");
  }
}, [token, navigate]); 
if (!token) return null
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log(text,image)
    const imageUrl = image ? URL.createObjectURL(image) : null;
    onPublish({ text, imageUrl,file:image });
    setText('');
    setImage(null);
    setPreview(null);
  };

  return (
    <div  >

      <textarea
        className="w-full h-48 p-2 rounded-lg bg-white/10 outline-none text-white mb-4"
        placeholder="Write your post here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />


      <input
        type="file"
        accept="image/*"
       className="mb-4 block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
        onChange={handleImageUpload}
      />

      {preview && (
        <div className="mb-4">
          <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" />
        </div>
      )}

  
      <button
      disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
        onClick={handleSubmit}
      >
        {loading?"Publishing...":"Publish"}
      </button>
    </div>
  );
};

export default CreatePost;
