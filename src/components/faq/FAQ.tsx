import React from "react";
import "./FAQ.css"
import { Collapse, Button } from "antd";

const { Panel } = Collapse;

function AppFaq() {
  return (
    <div id="faq" className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Frequently Asked Questions</h2>
        </div>
        <Collapse defaultActiveKey={["1"]}>
          <Panel
            header="How can I book an appointment?"
            key="1"
            className="panel"
          >
            <p>Not available</p>
          </Panel>
          <Panel
            header="How late can I reschedule an appointment?"
            key="2"
            className="panel"
          >
            <p>Not available</p>
          </Panel>
          <Panel
            header="Are the mechanics certified?"
            key="3"
            className="panel"
          >
            <p>Not available</p>
          </Panel>
          <Panel
            header="Does Truck Arena offer discounts or coupons?"
            key="4"
            className="panel"
          >
            <p>Not available</p>
          </Panel>
          <Panel
            header="What are the services you render"
            key="5"
            className="panel"
          >
            <p>Not available</p>
          </Panel>
          <Panel header="How to manage my account?" key="6" className="panel">
            <p>Not available</p>
          </Panel>
        </Collapse>
        <div className="quickSupport">
          <h3>Want quick support?</h3>
          <p>
            Get quick support 24/7 with our dedicated customer service team.
            We're here to help you with any answer questions, and resolve any
            issues. Trust us to make your experience stress-free and enjoyable.
          </p>
          <Button size="large" className="faq-btn">
            <a href="mailto:info@thetruckarena.com" className="fa-envelope">
              Send a message
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AppFaq;
