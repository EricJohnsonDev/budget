import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <Button onClick={getData}>
        Get test data 
      </Button>
    </main>
  );
}

async function getData() {
  const url = "http://localhost:8080/expense/date/05-29-2025";

  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
  console.error(error);
}
}

function Button({onClick, children}) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}