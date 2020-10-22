import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Button, Card, Container, Grid } from "semantic-ui-react";
import { INDEX_TITLE, INDEX_VIEW, INDEX_EDIT } from "../constants/lang";
import { LOCALHOST, VERCEL_URL } from "../constants/urls";

const Index = ({ notes }) => {
  return (
    <Container className="notes-container">
      <h1>{INDEX_TITLE}</h1>
      <Grid>
        {notes &&
          notes.map((note) => {
            return (
              <Grid.Column computer={4} mobile={8} tablet={5} key={note._id}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <Link href={`/${note._id}`}>
                        <a>{note.title}</a>
                      </Link>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content className="preview">
                    <Link href={`/${note._id}`}>
                      <a>{note.description}</a>
                    </Link>
                  </Card.Content>
                  <Card.Content extra>
                    <Link href={`/${note._id}`}>
                      <Button color="yellow">{INDEX_VIEW}</Button>
                    </Link>
                    <Link href={`/${note._id}/edit`}>
                      <Button primary>
                        {" "}
                        <i aria-hidden="true" className="edit icon"></i>
                        {INDEX_EDIT}
                      </Button>
                    </Link>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          })}
      </Grid>
    </Container>
  );
};

Index.getInitialProps = async () => {
  const getStatus = process.env.LIVE_STATUS;
  const getURL =
    getStatus === "production"
      ? `${VERCEL_URL}/api/notes`
      : `${LOCALHOST}/api/notes`;
  const res = await fetch(getURL);
  const { data } = await res.json();

  return { notes: data };
};
export default Index;
