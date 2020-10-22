import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import {
  NEW_HEADER,
  NEW_TITLE,
  NEW_TITLE_ERR_MSG,
  NEW_DESC,
  NEW_DESC_ERR_MSG,
  NEW_CREATE,
} from "../constants/lang";
import { LOCALHOST, VERCEL_URL } from "../constants/urls";

const NewNote = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createNote();
        // alert("SUCCESS!");
      } else {
        setIsSubmitting(false);
      }
    }
  });

  const createNote = async () => {
    try {
      const getStatus = process.env.LIVE_STATUS;
      const getURL = getStatus === "production" ? VERCEL_URL : LOCALHOST;

      const res = await fetch(`${getURL}/api/notes`, {
        method: "POST",
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
      <h1>{NEW_HEADER}</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={
                errors.title
                  ? { content: NEW_TITLE_ERR_MSG, pointing: "below" }
                  : null
              }
              label={NEW_TITLE}
              placeholder={NEW_TITLE}
              name="title"
              onChange={handleChange}
            />
            <Form.TextArea
              fluid
              error={
                errors.description
                  ? { content: NEW_DESC_ERR_MSG, pointing: "below" }
                  : null
              }
              label={NEW_DESC}
              placeholder={NEW_DESC}
              name="description"
              onChange={handleChange}
            />
            <Button type="submit">{NEW_CREATE}</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default NewNote;
