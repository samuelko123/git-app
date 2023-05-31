import { Button } from "./components/atoms/Button";
import { CloneRepositoryForm } from "./components/organisms/CloneRepositoryForm";
import { Dialog } from "./components/atoms/Dialog";

export const App = () => {
  return (
    <div id="App" className="container p-4">
      <Dialog header="Clone Repository" triggerButton={<Button>Clone</Button>}>
        <CloneRepositoryForm />
      </Dialog>
    </div>
  );
};
