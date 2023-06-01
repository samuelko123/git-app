import { FormEvent, useEffect, useState } from "react";
import { Clone } from "../../../wailsjs/go/backend/Git";
import {
  GetDirName,
  GetUserHomeDir,
  IsDirEmpty,
  Exists,
  PathJoin,
  GetParentDir,
} from "../../../wailsjs/go/backend/FS";
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

  useEffect(() => {
    (async () => {
      setFolder(await GetUserHomeDir());
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

  const handleUrlChange = async (url: string) => {
    setUrl(url);

    if (!url.endsWith(".git")) {
      return;
    }

    const folderName = await GetDirName(folder);
    const repoName =
      url
        .split("/")
        .at(-1)
        ?.replace(/\.git$/, "") || "";

    if (folderName === repoName) {
      return;
    }

    if (await Exists(folder)) {
      await handleFolderChange(await PathJoin(folder, repoName));
    } else {
      await handleFolderChange(
        await PathJoin(await GetParentDir(folder), repoName)
      );
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

  return (
    <Root onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
      <TextField
        required
        name="url"
        label="Repository URL"
        value={url}
        onChange={handleUrlChange}
      />
      <TextField
        required
        name="dir"
        label="Folder Path"
        value={folder}
        onChange={handleFolderChange}
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
