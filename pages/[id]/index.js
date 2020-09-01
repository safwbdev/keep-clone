import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { Confirm, Burron, Loader, Button } from "semantic-ui-react";

const Note = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const open = () => {
    setConfirm(true);
  };
  const close = () => {
    setConfirm(false);
  };
  const deleteNote = async () => {
    const noteID = router.query.id;
    try {
      const getStatus = process.env.LIVE_STATUS;
      const getURL =
        getStatus === "production"
          ? "https://keep-clone.vercel.app"
          : "http://localhost:3000";

      const deleted = await fetch(`${getURL}/api/notes/${noteID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };

  return (
    <div className="note-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button color="red" onClick={open}>
            Delete
          </Button>
        </>
      )}
      <Confirm open={confirm} onConfirm={handleDelete} onCancel={close} />
    </div>
  );
};

Note.getInitialProps = async ({ query: { id } }) => {
  const getStatus = process.env.LIVE_STATUS;
  const getURL =
    getStatus === "production"
      ? "https://keep-clone.vercel.app"
      : "http://localhost:3000";
  const res = await fetch(`${getURL}/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default Note;
