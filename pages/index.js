import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Button, Card, Container, Grid } from "semantic-ui-react";

const Index = ({ notes }) => {
  return (
    <Container className="notes-container">
      <h1>Notes</h1>
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
                    <Link href={`/${note._id}`}>{note.description}</Link>
                  </Card.Content>
                  <Card.Content extra>
                    <Link href={`/${note._id}`}>
                      <Button color="yellow">View</Button>
                    </Link>
                    <Link href={`/${note._id}/edit`}>
                      <Button primary>
                        {" "}
                        <i aria-hidden="true" class="edit icon"></i>
                        Edit
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
      ? "https://keep-clone.vercel.app/api/notes"
      : "http://localhost:3000/api/notes";
  const res = await fetch(getURL);
  const { data } = await res.json();

  return { notes: data };
};
export default Index;
