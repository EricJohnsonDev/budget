export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <Button onClick={getData}>
        Get test data 
      </Button>
      <Button onClick={addData}>
        Add test data 
      </Button>
    </main>
  );
}

async function getData() {
  const params = new URLSearchParams();
  params.append("start", "01-01-2000");
  params.append("end", "01-02-2000");

  const url = `http://localhost:8080/expense/date?${params}`;

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

async function addData() {
   const url = `http://localhost:8080/expense/add`;

   let testExpense = [{
    Date: '01-01-2000',
    Amount: '$666',
    Institution: 'First National Test',
    Category: 'Other',
    Comment: 'Test'
   }]

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(testExpense)
    });
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