import { FormEvent, useEffect, useState } from "react";
import { Clone } from "../../../wailsjs/go/backend/Git";
import { GetUserHomeDir } from "../../../wailsjs/go/backend/FS";
import { getMessageFromError } from "../../utils/errors";
import { TextField } from "../atoms/TextField";
import { Alert } from "../atoms/Alert";
import { Button } from "../atoms/Button";
import { Root, Submit } from "@radix-ui/react-form";

export const CloneRepositoryForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [dir, setDir] = useState<string>("");

  useEffect(() => {
    (async () => {
      setDir(await GetUserHomeDir());
    })();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
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
    <Root onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
      <TextField
        required
        name="url"
        label="Repository URL"
        value={url}
        onChange={setUrl}
      />
      <TextField
        required
        name="dir"
        label="Folder Path"
        value={dir}
        onChange={setDir}
      />
      <Submit asChild>
        <Button
          type="submit"
          className="justify-self-start"
          isLoading={loading}
        >
          Clone
        </Button>
      </Submit>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
    </Root>
  );
};
