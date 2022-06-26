import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import { isEmpty } from "../../utils/tools";


const SubmitBtn = styled.input`
  width: fit-content;
  background-color: ${colors.tertiary};
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
`;

const CardPicture = styled.img`
  width: 360px;
  height: 250px;
  border-radius: 5px;
`;


const CreatePost = ( props ) => {

  const getPosterId = props.cle;
  const getPosterPseudo = props.pseudo;

    const [addMessage, setAddMessage] = useState("");

    const [file, setFile] = useState();
    const [filename, setFilename] = useState("");
    const [uploadedFile, setUploadedfile] = useState({});

    const handleAddPost = (e) => {
        e.preventDefault();

          axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/posts`,
            withCredentials: true,
            data: {
              message : addMessage,
              picture : filename,
              posterId : getPosterId,
              posterPseudo : getPosterPseudo
            },
          })
          .then(() => {
            swal({
              title: "Ajouté!",
              text: "Votre post a bien été créé!",
              icon: "success",
            })
            .then(() => {
              window.location = "/"
            })
          })
          .catch((err) => {
            console.log(err);
          });
        }
    
      const handleUploadPicture = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
    
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}api/posts/file`,
            formData,
            {
              headers: {
                "Content-type": "multipart/form-data",
              },
            }
          );
          const { fileName, filePath } = res.data;
          console.log(res.data);
          setUploadedfile({ fileName, filePath });
        } catch (err) {
          if (err.response.status === 500) {
            console.log("Problème serveur");
          } else {
            console.log(err.response.data.msg);
          }
        }
      };
    
  return (
  <div>
    <form onSubmit={handleAddPost}>
  <textarea
    name="message"
    rows="5"
    cols="50"
    maxLength="500"
    onChange={(e) => setAddMessage(e.target.value)}
    value={addMessage}
  ></textarea>

  <input
    type="file"
    id="customFile"
    onChange={(e) => {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }}
  />
  <label htmlFor="customFile">{filename}</label>
  <button onClick={handleUploadPicture}>Importer</button>
  {!isEmpty(uploadedFile) ? (
    <div>
      <CardPicture src={uploadedFile.filePath} alt="user_post_pic" />
    </div>
  ) : null}

  <SubmitBtn type="submit" value="Valider" />
</form>
</div>
  );
};

export default CreatePost;
