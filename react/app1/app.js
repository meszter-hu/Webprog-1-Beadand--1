const { useState } = React;

function CounterApp() {
    const [count, setCount] = useState(0);

    return React.createElement("div", {}, [
        React.createElement("h3", {}, "Számláló: " + count),
        React.createElement("button", { onClick: () => setCount(count + 1) }, "Növelés"),
        React.createElement("button", { onClick: () => setCount(count - 1) }, "Csökkentés"),
        React.createElement("button", { onClick: () => setCount(0) }, "Nullázás"),
    ]);
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(CounterApp));
