import React from "react";
import { Clone } from "../wailsjs/go/backend/Git";
import { GetUserHomeDir } from "../wailsjs/go/backend/FS";
import { getMessageFromError } from "./utils/errors";
import { TextField } from "./components/atoms/TextField";
import { Alert } from "./components/atoms/Alert";
import { Button } from "./components/atoms/Button";

export const App = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");
  const [dir, setDir] = React.useState<string>("");

  React.useEffect(() => {
    (async () => {
      setDir(await GetUserHomeDir());
    })();
  }, []);

  async function clone() {
    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");
      await Clone(url, dir);
      setSuccessMessage("Cloned successfully");
    } catch (err) {
      setErrorMessage(getMessageFromError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container w-1/3 px-4 py-4 grid grid-cols-1 gap-4">
      <TextField label="URL" value={url} onChange={setUrl} />
      <TextField label="Folder" value={dir} onChange={setDir} />
      <div className="justify-self-start">
        <Button isLoading={loading} onClick={clone}>
          Clone
        </Button>
      </div>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
    </div>
  );
};
