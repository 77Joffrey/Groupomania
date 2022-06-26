import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import swal from "sweetalert";
import colors from "../../utils/style/colors";
import { isEmpty } from "../../utils/tools";

const FormDataStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  border: 5px solid ${colors.tertiary};
  border-radius: 10px;
  background-color: #fff;
  width: fit-content;
  height: 50px;
  color: black;
  text-align: center;
`;

const CardPicture = styled.img`
  width: 360px;
  height: 250px;
  border-radius: 5px;
`;

const SubmitBtn = styled.input`
  width: fit-content;
  background-color: ${colors.tertiary};
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
`;

const UpdateText = ( props ) => {

  const post = props.post
  const postid = props.postid

  const [loadingUpdatePost, setLoadingUpdatePost] = useState(true);
  const [updateMessage, setUpdateMessage] = useState(post.message);

  const [file, setFile] = useState();
  const [filename, setFilename] = useState("");
  const [uploadedFile, setUploadedfile] = useState({});
  const [verifFile, setVerifFile] = useState(false)

  const handleUpdatePost = (e) => {
    e.preventDefault();
    if(filename && verifFile === false) {
      alert ('Veuillez importer une image!')
    } else {
      /* const filename */
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/posts/${postid}`,
        withCredentials: true,
        data: {
          message : updateMessage,
          picture : filename
        },
      })
      .then(() => {
        swal({
          title: "Modifié!",
          text: "Votre post a bien été mis à jour!",
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
    
  };

  const handleUploadPicture = async (e) => {
    e.preventDefault();
    setVerifFile(true)
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
    <React.Fragment>
      <form onSubmit={handleUpdatePost}>
        <textarea
          name="message"
          rows="5"
          cols="50"
          maxLength="500"
          onChange={(e) => setUpdateMessage(e.target.value)}
          value={updateMessage}
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
    </React.Fragment>
  );
};

export default UpdateText;
