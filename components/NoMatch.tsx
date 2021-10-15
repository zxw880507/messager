import Link from "next/link";
interface NoMatchProps {
  path?: string;
}

export default function NoMatch(props: NoMatchProps) {
  const { path } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4em" }}>Sorry, this one stays red.</h1>
      <h2 style={{ fontSize: "3em", marginBottom: "1em" }}>
        No match for <code>{path}</code>.
      </h2>
      <h3>
        The page you’re looking for doesn’t exist, but you’re not at a dead end.
        Here are a few options:
      </h3>
      <ul style={{ fontSize: "1.5em" }}>
        <li>Be sure you have the right url and try again</li>
        <li style={{ marginTop: ".5em" }}>
          or{" "}
          <Link href="/">
            <a
              style={{
                color: "royalblue",
              }}
            >
              login
            </a>
          </Link>{" "}
          first
        </li>
      </ul>
    </div>
  );
}
