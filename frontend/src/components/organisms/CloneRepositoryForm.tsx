import { FormEvent, useEffect, useState } from "react";
import { Clone } from "../../../wailsjs/go/backend/Git";
import { GetUserHomeDir, IsDirEmpty } from "../../../wailsjs/go/backend/FS";
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
  const [folder, setFolder] = useState<string>("");
  const [shouldShow, setShouldShow] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setFolder(await GetUserHomeDir());
      setShouldShow(true);
    })();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");
      await Clone(url, folder);
      setSuccessMessage("Cloned successfully");
    } catch (err) {
      setErrorMessage(getMessageFromError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleFolderChange = async (folder: string) => {
    setFolder(folder);

    const isEmpty = await IsDirEmpty(folder);
    if (!isEmpty) {
      setErrorMessage("Folder is not empty");
    } else {
      setErrorMessage("");
    }
  };

  const handleError = (err: unknown) => {
    const message = getMessageFromError(err);
    setErrorMessage(message);
  };

  if (!shouldShow) {
    return null;
  }

  return (
    <Root onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 w-[36rem]">
      <TextField
        required
        name="url"
        label="Repository URL"
        value={url}
        onChange={setUrl}
        onError={handleError}
      />
      <TextField
        variant="folder-picker"
        required
        name="dir"
        label="Folder Path"
        value={folder}
        onChange={handleFolderChange}
        onError={handleError}
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
