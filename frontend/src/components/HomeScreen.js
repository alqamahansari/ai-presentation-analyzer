import Card from "./ui/Card";
import Button from "./ui/Button";
import { theme } from "../theme";

export default function HomeScreen({ startInterview }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.colors.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, system-ui"
      }}
    >
      <Card style={{ width: "700px", textAlign: "center" }}>

        <h1
          style={{
            fontSize: "36px",
            color: theme.colors.textPrimary,
            marginBottom: "20px"
          }}
        >
          AI Interview Analyzer
        </h1>

        <p
          style={{
            color: theme.colors.textSecondary,
            marginBottom: "40px",
            fontSize: "17px"
          }}
        >
          Practice interview responses and receive AI-powered feedback
          on communication, confidence, and language quality.
        </p>

        <Button onClick={startInterview}>
          Start Interview
        </Button>

      </Card>
    </div>
  );
}