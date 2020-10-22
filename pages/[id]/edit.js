import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import {
  UPDATE_HEADER,
  UPDATE_TITLE,
  UPDATE_TITLE_ERR_MSG,
  UPDATE_DESC,
  UPDATE_DESC_ERR_MSG,
  UPDATE_BTN,
} from "../../constants/lang";
import { LOCALHOST, VERCEL_URL } from "../../constants/urls";

const EditNote = ({ note }) => {
  const [form, setForm] = useState({
    title: note.title,
    description: note.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote();
      } else {
        setIsSubmitting(false);
      }
    }
  });

  const updateNote = async () => {
    try {
      const getStatus = process.env.LIVE_STATUS;
      const getURL = getStatus === "production" ? VERCEL_URL : LOCALHOST;

      const res = await fetch(`${getURL}/api/notes/${router.query.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }

    return err;
  };

  return (
    <div className="form-container">
      <h1>{UPDATE_HEADER}</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              error={
                errors.title
                  ? { content: { UPDATE_TITLE_ERR_MSG }, pointing: "below" }
                  : null
              }
              label={UPDATE_TITLE}
              placeholder={UPDATE_TITLE}
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <Form.TextArea
              error={
                errors.description
                  ? { content: { UPDATE_DESC_ERR_MSG }, pointing: "below" }
                  : null
              }
              label={UPDATE_DESC}
              placeholder={UPDATE_DESC}
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <Button type="submit">{UPDATE_BTN}</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

EditNote.getInitialProps = async ({ query: { id } }) => {
  const getStatus = process.env.LIVE_STATUS;
  const getURL = getStatus === "production" ? VERCEL_URL : LOCALHOST;
  const res = await fetch(`${getURL}/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default EditNote;
