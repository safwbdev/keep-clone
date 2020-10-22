import { useState, useEffect } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { Confirm, Loader, Button, Container } from "semantic-ui-react";
import { NOTE_EDIT, NOTE_DELETE } from "../../constants/lang";
import { LOCALHOST, VERCEL_URL } from "../../constants/urls";

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
      const getURL = getStatus === "production" ? VERCEL_URL : LOCALHOST;

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
    <Container textAlign="center">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Link href={`/${note._id}/edit`}>
            <Button primary>
              <i aria-hidden="true" class="edit icon"></i> {NOTE_EDIT}
            </Button>
          </Link>
          <Button color="red" onClick={open}>
            <i aria-hidden="true" class="delete icon"></i>
            {NOTE_DELETE}
          </Button>
        </>
      )}

      <Confirm open={confirm} onConfirm={handleDelete} onCancel={close} />
    </Container>
  );
};

Note.getInitialProps = async ({ query: { id } }) => {
  const getStatus = process.env.LIVE_STATUS;
  const getURL = getStatus === "production" ? VERCEL_URL : LOCALHOST;
  const res = await fetch(`${getURL}/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default Note;
