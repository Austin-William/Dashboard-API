import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="Footer">
        <div className="Footer-container">
          <Container>
            <Row>
              <Col xs={12} sm={6} md={4}>
                <h4 className="Footer-title-about">About</h4>
                <p className="Footer-about">
                  Well, the result is not phew but if the person reads this
                  little "about" and laughs, mission accomplished. In any case,
                  we are having a good time doing this project.
                </p>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <h4 className="Footer-title-contact">Contact</h4>
                <li className="Footer-contact">Austin : 01 02 03 04 05</li>
                <li className="Footer-contact">Vincent : 06 07 08 09 00</li>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <h4 className="Footer-title-social">Social</h4>
                <p className="Footer-social">
                  We don't have any social networks so we just put a link to
                  sites.
                </p>
                <p>
                  <a
                    href="https://www.google.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    );
  }
}

export default Footer;
