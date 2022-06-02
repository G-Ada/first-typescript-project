import { Component } from "./base-component";
import { autobind } from "../decorators/autobind";
import { Validatable, validate } from "../util/validation";
import { projectState } from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    let enteredTitle = this.titleInputElement.value;
    let enteredDescription = this.descriptionInputElement.value;
    let enteredPeople = this.peopleInputElement.value;

    let validatableTitle: Validatable = {
      value: enteredTitle,
      required: true,
    };
    let validatableDescription: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    let validatablePeople: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(validatableTitle) ||
      !validate(validatableDescription) ||
      !validate(validatablePeople)
    ) {
      alert("Invalid input, please try again");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInfo = this.gatherUserInput();
    if (Array.isArray(userInfo)) {
      let [title, desc, people] = userInfo;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
