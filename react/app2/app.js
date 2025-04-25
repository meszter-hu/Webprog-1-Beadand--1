const { useState } = React;

function RPSApp() {
    const [choice, setChoice] = useState("");
    const [result, setResult] = useState("");

    const play = (userChoice) => {
        const options = ["kő", "papír", "olló"];
        const computerChoice = options[Math.floor(Math.random() * 3)];
        setChoice("Gép választása: " + computerChoice);

        if (userChoice === computerChoice) {
            setResult("Döntetlen!");
        } else if (
            (userChoice === "kő" && computerChoice === "olló") ||
            (userChoice === "papír" && computerChoice === "kő") ||
            (userChoice === "olló" && computerChoice === "papír")
        ) {
            setResult("Nyertél!");
        } else {
            setResult("Vesztettél!");
        }
    };

    return React.createElement("div", {}, [
        React.createElement("h3", {}, "Kő-Papír-Olló"),
        React.createElement("button", { onClick: () => play("kő") }, "Kő"),
        React.createElement("button", { onClick: () => play("papír") }, "Papír"),
        React.createElement("button", { onClick: () => play("olló") }, "Olló"),
        React.createElement("p", {}, choice),
        React.createElement("strong", {}, result)
    ]);
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(RPSApp));