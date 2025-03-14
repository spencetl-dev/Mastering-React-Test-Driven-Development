import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";

describe("Appointment", () => {
  let customer;
  let container;

  const render = (component) => ReactDOM.render(component, container);

  beforeEach(() => (container = document.createElement("div")));

  it("renders the customer first name", () => {
    customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch("Ashley");
  });

  it("renders another customer first name", () => {
    customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch("Jordan");
  });
});
describe("AppointmentDaysView", () => {
  let container;

  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: "Ashley" },
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: "Jordan" },
    },
  ];

  const render = (component) => ReactDOM.render(component, container);

  beforeEach(() => (container = document.createElement("div")));

  it("renders a div with the correct id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders multiple appointments in an ol element", () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelector("ol").children).not.toBeNull();
    expect(container.querySelector("ol").children).toHaveLength(2);
  });

  it("renders each appointment in an li", () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll("li")[0].textContent).toEqual("12:00");
    expect(container.querySelectorAll("li")[1].textContent).toEqual("13:00");
  });

  it("initially displays a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toEqual("There are no appointments today.");
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch("Ashley");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll("li > button")).toHaveLength(2);
    expect(container.querySelectorAll("li > button")[0].type).toEqual("button");
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentDayView appointments={appointments} />);
    const button = container.querySelectorAll("li > button")[1];
    ReactTestUtils.Simulate.click(button);
    expect(container.textContent).toMatch("Jordan");
  });
});
