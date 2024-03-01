export class GameForm {
  constructor(container = document.body, { from = 0, to = 100 }) {
    this.container = container;
    this.from = from;
    this.to = to;
    this.count = 0;
    this.makePopUp();
    this.render();
  }

  render() {
    this.initializeNumber();
    this.makeTemplate();
    this.addEventListeners();

    this.container.innerHTML = "";
    this.container.append(this.element);
  }

  initializeNumber() {
    this.number = Math.round(Math.random() * (this.to - this.from) + this.from);
  }

  restart() {
    const div = document.createElement("div");
    div.innerHTML = `<form class="form" id="form1">
        <p class="name">
          <input
            name="name"
            type="number"
            class="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
            placeholder="Input start integer"
            id="from"
          />
        </p>
        <p class="email">
          <input
            name="email"
            type="number"
            class="validate[required,custom[email]] feedback-input"
            id="to"
            placeholder="Input end integer"
          />
        </p>
        <div class="submit">
          <button id="button-blue">Start game</button>
          <div class="ease"></div>
        </div>
      </form>`;

    const button = div.querySelector("#button-blue");
    const fromInput = div.querySelector("#from");
    const toInput = div.querySelector("#to");

    button.onclick = (event) => {
      event.preventDefault();

      this.from = fromInput.value;
      this.to = toInput.value;
      this.render();
    };

    this.count = 0;
    this.container.innerHTML = "";
    this.container.append(div.firstElementChild);
  }

  makeTemplate() {
    const div = document.createElement("div");
    div.innerHTML = `
    <form class="form" id="form1">
        <p class="name">
          <input
            name="name"
            type="number"
            class="validate[required,custom[onlyLetter],length[0,100]] feedback-input"
            placeholder="Your number"
            id="name"
          />
        </p>
        <div class="submit">
          <button id="button-blue">Check</button>
          <div class="ease"></div>
          <button id="button-blue" class="restart">Restart</button>
          <div class="ease"></div>

        </div>
    </form>`;

    this.element = div.firstElementChild;
  }

  winTemplate() {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="form" id="form1">
        <p class="title">
            You win!          
        </p>
        <div class="submit">
          <button id="button-blue" class="restart">Restart</button>
          <div class="ease"></div>
        </div>
    </div>`;

    const restartButton = div.querySelector(".restart");
    restartButton.onclick = (event) => {
      event.preventDefault();

      this.restart();
    };

    this.container.innerHTML = "";
    this.container.append(div.firstElementChild);
  }

  makePopUp() {
    const div = document.createElement("div");
    div.innerHTML = `<div class="popup popup-hidden">
    <h2>Clue</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
        
    </div>
</div>`;

    this.popup = div.firstElementChild;
    document.body.append(this.popup);
  }

  addEventListeners() {
    const checkButton = this.element.querySelector("#button-blue");
    const input = this.element.querySelector("input");
    const restartButton = this.element.querySelector(".restart");
    const popUpContent = this.popup.querySelector(".content");

    checkButton.addEventListener("click", (event) => {
      event.preventDefault();
      const answer = Number(input.value);

      if (answer < this.from || answer > this.to) {
        popUpContent.innerHTML = `Input number from ${this.from} to ${this.to}`;

        this.popup.style.opacity = "1";

        setTimeout(() => (this.popup.style.opacity = "0"), 3000);
        return;
      }

      if (answer === this.number) {
        this.winTemplate();
        return;
      }
      this.count++;

      if (this.count % 3 === 0) {
        popUpContent.innerHTML =
          this.number % 2 ? "The number is odd" : "The number is even";
        this.popup.style.opacity = "1";

        setTimeout(() => (this.popup.style.opacity = "0"), 3000);
      } else {
        popUpContent.innerHTML = `Wrong answer`;
        this.popup.style.opacity = "1";
        this.popup.style.color = "red";

        setTimeout(() => {
          this.popup.style.opacity = "0";
          this.popup.style.color = "";
        }, 500);
      }
    });

    restartButton.onclick = (event) => {
      event.preventDefault();
      this.restart();
    };
  }
}
